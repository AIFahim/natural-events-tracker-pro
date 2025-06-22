import json
import redis
from typing import Optional, Any
from datetime import timedelta
import logging
from app.core.config import get_settings

logger = logging.getLogger(__name__)
settings = get_settings()


class CacheService:
    def __init__(self):
        self.redis_client = None
        if settings.REDIS_URL:
            try:
                self.redis_client = redis.from_url(settings.REDIS_URL)
                self.redis_client.ping()
                logger.info("Redis cache connected successfully")
            except Exception as e:
                logger.warning(f"Failed to connect to Redis: {e}")
                self.redis_client = None
    
    async def get(self, key: str) -> Optional[Any]:
        """Get value from cache"""
        if not self.redis_client:
            return None
            
        try:
            value = self.redis_client.get(key)
            if value:
                return json.loads(value)
            return None
        except Exception as e:
            logger.error(f"Cache get error: {e}")
            return None
    
    async def set(self, key: str, value: Any, ttl: int = settings.CACHE_TTL) -> bool:
        """Set value in cache with TTL"""
        if not self.redis_client:
            return False
            
        try:
            serialized = json.dumps(value)
            self.redis_client.setex(key, ttl, serialized)
            return True
        except Exception as e:
            logger.error(f"Cache set error: {e}")
            return False
    
    async def delete(self, key: str) -> bool:
        """Delete value from cache"""
        if not self.redis_client:
            return False
            
        try:
            self.redis_client.delete(key)
            return True
        except Exception as e:
            logger.error(f"Cache delete error: {e}")
            return False
    
    async def clear_pattern(self, pattern: str) -> bool:
        """Clear all keys matching pattern"""
        if not self.redis_client:
            return False
            
        try:
            keys = self.redis_client.keys(pattern)
            if keys:
                self.redis_client.delete(*keys)
            return True
        except Exception as e:
            logger.error(f"Cache clear pattern error: {e}")
            return False