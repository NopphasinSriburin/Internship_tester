# pokemon_api.py
import requests

def get_pokemon_data(pokemon_id):
    url = f"https://pokeapi.co/api/v2/pokemon/{pokemon_id}/"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        stats = data['stats']
        name = data['name']
        sprites = data['sprites']

        pokemon_info = {
            "name": name,
            "stats": [
                {
                    "stat_name": stat['stat']['name'],
                    "base_stat": stat['base_stat']
                } for stat in stats
            ],
            "sprites": {
                "front_default": sprites['front_default'],
                "back_default": sprites['back_default'],
                "front_shiny": sprites['front_shiny'],
                "back_shiny": sprites['back_shiny']
            }
        }
        return pokemon_info
    else:
        return {"error": "Pokemon not found"}

if __name__ == "__main__":
    print(get_pokemon_data(1))