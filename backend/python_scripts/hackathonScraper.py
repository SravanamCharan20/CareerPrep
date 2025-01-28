from pymongo import MongoClient
import requests
from bs4 import BeautifulSoup
import logging
import certifi  # Ensure certifi is imported

# Use certifi's CA certificates for MongoDB connection
client = MongoClient(
    'mongodb+srv://cherry:cherry@cluster0.nauaz.mongodb.net/?retryWrites=true&w=majority',
    tls=True,
    tlsCAFile=certifi.where()  # This points to the certifi certificate bundle
)

db = client['test']
collection = db['hackathons']

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# Function to parse each hackathon
def parse_hackathon(card):
    title = card.select_one('h3').text.strip() if card.select_one('h3') else "Unknown"
    category = card.select_one('p').text.strip() if card.select_one('p') else "N/A"
    
    links = [a.get('href') for a in card.find_all('a', href=True)]
    images = [img['src'] for img in card.select('div.sc-bGWzfD img')]
    
    participants_element = card.select_one('p.sc-hZgfyJ.iYRNEE')
    participants = participants_element.text.strip().split()[0] if participants_element else None
    
    theme = card.select_one('p.sc-hZgfyJ.hZQPen').text.strip() if card.select_one('p.sc-hZgfyJ.hZQPen') else "No Restrictions"
    location = card.select_one('.sc-edUIhV.itJWDM:nth-of-type(1)').text.strip() if card.select_one('.sc-edUIhV.itJWDM:nth-of-type(1)') else "Unknown"
    status = card.select_one('.sc-edUIhV.itJWDM:nth-of-type(2)').text.strip() if card.select_one('.sc-edUIhV.itJWDM:nth-of-type(2)') else "N/A"
    
    date_element = card.select_one('.sc-edUIhV.itJWDM:nth-of-type(3)')
    date = date_element.text.strip() if date_element else 'Unknown'
    
    hackathon_data = {
        'title': title,
        'category': category,
        'links': links,
        'images': images,
        'participants': participants,
        'theme': theme,
        'location': location,
        'status': status,
        'start_date': date,
    }
    
    return hackathon_data

url = "https://devfolio.co/hackathons" 

try:
    response = requests.get(url)
    response.raise_for_status()
    soup = BeautifulSoup(response.content, 'html.parser')
    hackathon_cards = soup.select('.CompactHackathonCard__StyledCard-sc-9ff45231-0')

    for card in hackathon_cards:
        hackathon_data = parse_hackathon(card)
        
        existing_hackathon = collection.find_one({'title': hackathon_data['title']})
        if not existing_hackathon:
            collection.insert_one(hackathon_data)
            logging.info(f"Inserted hackathon: {hackathon_data['title']}")
        else:
            logging.info(f"Duplicate hackathon: {hackathon_data['title']} - Skipped")
except requests.exceptions.RequestException as e:
    logging.error(f"Request failed: {e}")
except Exception as e:
    logging.error(f"An error occurred: {e}")