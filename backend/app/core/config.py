from typing import Optional
from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    APP_NAME: str = "Natural Events Tracker API"
    VERSION: str = "1.0.0"
    DEBUG: bool = False
    
    # API Configuration
    API_V1_PREFIX: str = "/api/v1"
    NASA_EONET_API_URL: str = "https://eonet.gsfc.nasa.gov/api/v3/events"
    DEFAULT_DAYS: int = 30
    
    # CORS Configuration
    ALLOWED_ORIGINS: list[str] = ["http://localhost:3000", "http://localhost:3001"]
    
    # Cache Configuration
    CACHE_TTL: int = 3600  # 1 hour in seconds
    REDIS_URL: Optional[str] = None
    
    # Rate Limiting
    RATE_LIMIT_PER_MINUTE: int = 60
    
    class Config:
        env_file = ".env"
        case_sensitive = True


@lru_cache()
def get_settings() -> Settings:
    return Settings()