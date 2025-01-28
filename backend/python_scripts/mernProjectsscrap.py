from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
from pymongo import MongoClient

# MongoDB setup
client = MongoClient("mongodb+srv://cherry:cherry@cluster0.nauaz.mongodb.net/?retryWrites=true&w=majority")
db = client['test']
collection = db['mernprojects']

# Specify the correct path to ChromeDriver
driver_path = "/Users/charan/Downloads/chromedriver-mac-arm64/chromedriver"
service = Service(driver_path)

# Create a WebDriver instance
driver = webdriver.Chrome(service=service)

# GitHub URL to scrape
url = "https://github.com/topics/mern-project"

# Function to parse each project card
def parse_project(card):
    project_data = {}
    try:
        # Extract owner and repository name
        repo_link_tag = card.find_element(By.CSS_SELECTOR, 'h3 a.Link.text-bold')
        owner_repo = repo_link_tag.get_attribute('href').split('/')[-2:]  # Extracts 'mxgmn' and 'WaveFunctionCollapse'
        project_data['owner'] = owner_repo[0]
        project_data['repo_name'] = owner_repo[1]
        # Full repo link (owner + repo name)
        project_data['repo_link'] = "https://github.com/" + "/".join(owner_repo)
    except Exception:
        project_data['owner'] = project_data['repo_name'] = project_data['repo_link'] = None

    try:
        # Extract description
        description_tag = card.find_element(By.CSS_SELECTOR, 'p.f5')
        project_data['description'] = description_tag.text.strip() if description_tag else "No description provided."
    except Exception:
        project_data['description'] = "No description provided."

    try:
        # Wait for star count to be loaded in the span
        star_tag = WebDriverWait(card, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, '#repo-stars-counter-star'))
        )
        stars_text = star_tag.text.strip()

        # Handle "21.8k" format for stars (converts k to numbers)
        if 'k' in stars_text:
            stars_text = stars_text.replace('k', '000').replace('.', '')  # Handle "21.8k" => "21800"
        elif 'M' in stars_text:
            stars_text = stars_text.replace('M', '000000').replace('.', '')  # Handle "2M" => "2000000"
        
        project_data['stars'] = int(stars_text) if stars_text.isdigit() else 0
    except Exception:
        project_data['stars'] = 0

    return project_data

# Load the URL using Selenium
driver.get(url)

# Function to scroll and load more projects
def load_more_projects():
    try:
        # Wait until the "Load more" button is present and clickable
        load_more_button = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.XPATH, '//button[contains(text(), "Load more")]'))
        )
        # Scroll to the "Load more" button to make sure it's in view
        driver.execute_script("arguments[0].scrollIntoView();", load_more_button)
        # Click the "Load more" button
        load_more_button.click()
        time.sleep(2)  # Give time for more projects to load
    except Exception as e:
        print(f"Error clicking 'Load more' button: {e}")
        pass  # No more load buttons, proceed to finish

# Extracting initial projects
project_cards = driver.find_elements(By.CSS_SELECTOR, 'article.border.rounded.color-shadow-small.color-bg-subtle.my-4')

# Parse the initial set of projects
projects = [parse_project(card) for card in project_cards]

# Keep clicking "Load more" until no new projects are loaded
while True:
    previous_card_count = len(project_cards)
    load_more_projects()  # Click the "Load more" button to load more projects
    project_cards = driver.find_elements(By.CSS_SELECTOR, 'article.border.rounded.color-shadow-small.color-bg-subtle.my-4')
    
    if len(project_cards) > previous_card_count:
        new_cards = project_cards[previous_card_count:]  # Extract only newly loaded cards
        projects.extend([parse_project(card) for card in new_cards])
    else:
        break  # Exit loop if no new projects are loaded

# Filter out incomplete or invalid project data
valid_projects = [project for project in projects if project['owner'] and project['repo_name'] and project['repo_link']]

# Extracted projects, insert them into MongoDB
for project in valid_projects:
    try:
        # Avoid duplicates in MongoDB
        existing_project = collection.find_one({'repo_link': project['repo_link']})
        if not existing_project:
            collection.insert_one(project)
            print(f"Inserted project: {project['repo_name']}")
        else:
            print(f"Duplicate project: {project['repo_name']} - Skipped")
    except Exception as e:
        print(f"Error inserting project into MongoDB: {e}")

print("Scraping complete!")

# Close the driver after use
driver.quit()