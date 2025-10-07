from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    try:
        # Navigate to the homepage
        page.goto("http://localhost:5173/")

        # Wait for the page to load
        page.wait_for_load_state("networkidle")

        # Take a screenshot of the homepage
        page.screenshot(path="/app/jules-scratch/verification/homepage.png")

        print("Screenshot of the homepage has been taken successfully.")

    except Exception as e:
        print(f"An error occurred: {e}")
    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)