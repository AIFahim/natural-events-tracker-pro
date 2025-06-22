"""Mock data for testing when NASA API is not accessible"""

MOCK_EVENTS = [
    {
        "id": "EONET_6226",
        "title": "Etna Volcano, Italy",
        "description": "Mount Etna is an active stratovolcano on the east coast of Sicily, Italy.",
        "categories": [
            {
                "id": "volcanoes",
                "title": "Volcanoes"
            }
        ],
        "sources": [
            {
                "id": "SIVolcano",
                "url": "https://volcano.si.edu/volcano.cfm?vn=211060"
            }
        ],
        "geometry": [
            {
                "type": "Point",
                "coordinates": [14.999, 37.748]
            }
        ],
        "closed": None
    },
    {
        "id": "EONET_6227",
        "title": "Wildfire - Los Angeles County, California",
        "description": "Wildfire in Los Angeles County",
        "categories": [
            {
                "id": "wildfires",
                "title": "Wildfires"
            }
        ],
        "sources": [
            {
                "id": "InciWeb",
                "url": "https://inciweb.nwcg.gov/"
            }
        ],
        "geometry": [
            {
                "type": "Point",
                "coordinates": [-118.243, 34.052]
            }
        ],
        "closed": "2024-01-15T00:00:00Z"
    },
    {
        "id": "EONET_6228",
        "title": "Iceberg A23a",
        "description": "Large iceberg in the Weddell Sea",
        "categories": [
            {
                "id": "seaLakeIce",
                "title": "Sea and Lake Ice"
            }
        ],
        "sources": [
            {
                "id": "NATICE",
                "url": "https://usicecenter.gov/"
            }
        ],
        "geometry": [
            {
                "type": "Point",
                "coordinates": [-60.0, -75.0]
            }
        ],
        "closed": None
    },
    {
        "id": "EONET_6229",
        "title": "Tropical Storm Harold",
        "description": "Tropical storm in the Gulf of Mexico",
        "categories": [
            {
                "id": "severeStorms",
                "title": "Severe Storms"
            }
        ],
        "sources": [
            {
                "id": "NOAA_NHC",
                "url": "https://www.nhc.noaa.gov/"
            }
        ],
        "geometry": [
            {
                "type": "Point",
                "coordinates": [-97.0, 27.0]
            }
        ],
        "closed": "2024-01-20T00:00:00Z"
    },
    {
        "id": "EONET_6230",
        "title": "Wildfire - British Columbia, Canada",
        "description": "Forest fire in British Columbia",
        "categories": [
            {
                "id": "wildfires",
                "title": "Wildfires"
            }
        ],
        "sources": [
            {
                "id": "BCWS",
                "url": "https://www2.gov.bc.ca/gov/content/safety/wildfire-status"
            }
        ],
        "geometry": [
            {
                "type": "Point",
                "coordinates": [-123.0, 52.0]
            }
        ],
        "closed": None
    }
]