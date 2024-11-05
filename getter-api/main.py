import os
import requests

from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse
from dotenv import load_dotenv, dotenv_values 
load_dotenv()

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get('/food-search')
async def search_food(request:Request, cuisine: str, priceRange: str, latitude: str, longitude: str):
    apiKey = os.getenv('GOOGLE_MAPS_API_KEY')
    print(apiKey)
    if not cuisine or not priceRange or not latitude or not longitude:
        raise HTTPException(status_code=400, detail="Missing required search parameters")

    try:
        url = (
            f"https://maps.googleapis.com/maps/api/place/findplacefromtext/json"
            f"?fields=formatted_address,name,rating,opening_hours,place_id"
            f"&input={requests.utils.quote(cuisine + ' restaurant with price ' + priceRange)}"
            f"&inputtype=textquery"
            f"&locationbias=circle:2000@{latitude},{longitude}"
            f"&key={apiKey}"
        )

        response = requests.get(url)
        response.raise_for_status()

        return JSONResponse(content=response.json())
    except Exception as e:
        print(f"Error fetching data from Google Maps API: {e}")
        raise HTTPException(status_code=500, detail="An error occurred while fetching data from Google Maps API")
    return 