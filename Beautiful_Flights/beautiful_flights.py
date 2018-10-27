import csv
import sys
import warnings
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains
from selenium.common.exceptions import NoSuchElementException
import json


try:
    import bs4
except ImportError:
    warnings.warn("dependency not found, please install bs4")
try:
    import requests
except ImportError:
    warnings.warn("dependency not found, please install requests")


class flight:

    def __init__(self, date, time):
       self.date = date
       self.time = time

    def printData(self):
        print(self.date + " : "+ self.time)



def getFlights(soupDataLocal):
    initial = (soupDataLocal.find(attrs={"data-ng-app":"fr24App"}))
    subPage = initial.find(attrs={"id":"cnt-data-subpage"})
    airportCtrl = subPage.find(attrs={"data-ng-controller":"AirportsDataCtrl"})
    p4 = airportCtrl.find(attrs={"id":"cnt-data-content"})
    p5 = p4.find(attrs={"class":"tab-content"})
    p6 = p5.find(attrs={"class":"tab-pane p-l active"})
    p7 = p6.find(attrs={"class":"row"})
    p8 = p7.find(attrs={"class":"col-sm-12 airport-schedule-data"})
    p9 = p8.find(attrs={"class":"row cnt-schedule-table"})
    p10 = p9.find(attrs={"class":"table table-condensed table-hover data-table m-n-t-15"})
    p11 = p10.find("tbody")
    p12 = p11.find_all("tr")
    flightData = []
    for x in p12:
        date = ""
        time = ""
        if x.has_attr('data-date'):
            date = str(x['data-date'])
        if date is not None:
            td = x.find_all("td", class_="ng-binding")
            for t in td:
                temp = ''.join(t.text)
                temp.strip()
                stringBuilder = ""
                time = ""
                for i in temp:
                    i = str(i)
                    stringBuilder+=i
                    if i is not " ":
                        time +=stringBuilder
                        stringBuilder = ""
                break
        if date is "" or time is "":
            continue
        else:
            f = flight(date, time)
            flightData.append(f)
    return flightData




def main():
    url = None
    pages = []
    airportCode = str(sys.argv[1])
    url = "https://www.flightradar24.com/data/airports/"+airportCode+"/arrivals"
    driver = webdriver.Chrome("/Users/danielkiselev/PycharmProjects/Beautiful_Flights/chromedriver")
    driver.implicitly_wait(30)
    driver.get(url)
    myElem = WebDriverWait(driver, 30).until(EC.presence_of_element_located((By.XPATH, r'//*[@id="cnt-data-content"]/div/div[2]/div/aside/div[1]/table/tfoot/tr[1]/td/button')))
    page = driver.execute_script('return document.body.innerHTML')
    soupData = bs4.BeautifulSoup(''.join(page), 'html.parser')
    pages.append(soupData)
    while True:
        try:
            driver.find_element_by_xpath(r'//*[@id="cnt-data-content"]/div/div[2]/div/aside/div[1]/table/tfoot/tr[1]/td/button').click()
        except:
            break
        time.sleep(5)
        soup = bs4.BeautifulSoup(driver.page_source, 'html.parser')
        pages.append(soup)
        time.sleep(5)
    print(len(pages))
    AirportFlights = []
    for i in pages:
        AirportFlights+=getFlights(i)
    data = {}
    data['flights'] = []
    for f in AirportFlights:
        data['flights'].append({
            'date': f.date,
            'time': f.time
        })
    with open('data.json', 'w') as outfile:
        json.dump(data, outfile)






if __name__ == "__main__":
    main()
