const ical = require('ical-generator').default;
const { log } = require('console');
const fs = require('fs');


// Node script takes the list of events in the format MonthName DayNumber EventTitle and export an .ics file that can be imported into Google Calendar
const textElements = [
    '2024-01-01: Neujahr',
    '2024-01-03: Gelber Sack',
    '2024-01-04: Restmüll',
    '2024-01-05: Papiertonne',
    '2024-01-06: Hl. Drei Könige',
    '2024-01-11: Biomüll',
    '2024-01-13: Christbaumabh',
    '2024-01-15: Giftmobil',
    '2024-01-16: Gelber Sack',
    '2024-01-18: Restmüll',
    '2024-01-25: Biomüll',
    '2024-01-30: Gelber Sack',
    '2024-02-01: Restmüll',
    '2024-02-02: Papiertonne',
    '2024-02-08: Biomüll',
    '2024-02-13: Gelber Sack',
    '2024-02-15: Restmüll',
    '2024-02-19: Giftmobil',
    '2024-02-20: Sperrmüll',
    '2024-02-22: Biomüll',
    '2024-02-27: Gelber Sack',
    '2024-02-29: Restmüll',
    '2024-03-01: Papiertonne',
    '2024-03-07: Biomüll',
    '2024-03-12: Gelber Sack',
    '2024-03-14: Restmüll',
    '2024-03-18: Giftmobil',
    '2024-03-21: Biomüll',
    '2024-03-23: Gartenabfälle',
    '2024-03-25: Gelber Sack',
    '2024-03-27: Restmüll',
    '2024-03-28: Papiertonne',
    '2024-03-29: Karfreitag',
    '2024-03-30: Ostersonntag',
    '2024-04-01: Ostermontag',
    '2024-04-05: Biomüll',
    '2024-04-06: Gartenabfälle',
    '2024-04-09: Gelber Sack',
    '2024-04-11: Restmüll, Spemüll',
    '2024-04-15: Giftmobil',
    '2024-04-18: Biomüll',
    '2024-04-20: Gartenabfälle',
    '2024-04-23: Gelber Sack',
    '2024-04-25: Restmüll',
    '2024-04-26: Papiertonne',
    '2024-05-01: Maifeiertag',
    '2024-05-03: Biomüll',
    '2024-05-04: Gartenabfälle',
    '2024-05-07: Gelber Sack',
    '2024-05-09: Christi Himmelf',
    '2024-05-10: Restmüll',
    '2024-05-13: Giftmobil',
    '2024-05-16: Biomüll',
    '2024-05-18: Gartenabfälle',
    '2024-05-19: Pfingstsonntag',
    '2024-05-20: Pfingstmontag',
    '2024-05-22: Gelber Sack',
    '2024-05-24: Restmüll',
    '2024-05-25: Papiertonne',
    '2024-05-30: Fronleichnam',
    '2024-06-01: Gartenabfälle',
    '2024-06-04: Gelber Sack',
    '2024-06-06: Restmüll',
    '2024-06-13: Biomüll',
    '2024-06-15: Gartenabfälle',
    '2024-06-17: Giftmobil',
    '2024-06-18: Gelber Sack',
    '2024-06-20: Restmüll',
    '2024-06-21: Papiertonne',
    '2024-06-27: Biomüll',
    '2024-06-29: Gartenabfälle',
    '2024-07-02: Gelber Sack',
    '2024-07-04: Restmüll, Spermüll',
    '2024-07-11: Biomüll',
    '2024-07-13: Gartenabfälle',
    '2024-07-15: Giftmobile',
    '2024-07-16: Gelber Sack',
    '2024-07-18: Restmüll',
    '2024-07-19: Papiertonne',
    '2024-07-25: Biomüll',
    '2024-07-27: Gartenabfälle',
    '2024-07-30: Gelber Sack',
    '2024-08-01: Restmüll',
    '2024-08-08: Biomüll',
    '2024-08-13: Gelber Sack',
    '2024-08-15: Mariä Himmelfahrt',
    '2024-08-16: Restmüll',
    '2024-08-17: Papiertonne, Gartenabfälle',
    '2024-08-19: Giftmobil',
    '2024-08-22: Biomüll',
    '2024-08-27: Gelber Sack',
    '2024-08-29: Restmüll',
    '2024-09-05: Biomüll',
    '2024-09-07: Gartenabfälle',
    '2024-09-09: Giftmobil',
    '2024-09-10: Gelber Sack',
    '2024-09-12: Restmüll',
    '2024-09-13: Papiertonne',
    '2024-09-19: Biomüll',
    '2024-09-21: Gartenabfälle',
    '2024-09-24: Gelber Sack',
    '2024-09-26: Restmüll, Spermüll',
    '2024-10-03: Tag der Dt. Einheit',
    '2024-10-04: Biomüll',
    '2024-10-05: Gartenabfälle',
    '2024-10-07: Giftmobil',
    '2024-10-08: Gelber Sack',
    '2024-10-10: Restmüll',
    '2024-10-11: Papiertonne',
    '2024-10-17: Biomüll',
    '2024-10-19: Gartenabfälle',
    '2024-10-22: Gelber Sack',
    '2024-10-24: Restmüll',
    '2024-10-31: Biomüll',
    '2024-11-01: Allerheiligen',
    '2024-11-02: Gartenabfälle',
    '2024-11-04: Giftmobil',
    '2024-11-05: Gelber Sack',
    '2024-11-07: Restmüll',
    '2024-11-08: Papiertonne',
    '2024-11-14: Biomüll',
    '2024-11-16: Gartenabfälle',
    '2024-11-19: Gelber Sack',
    '2024-11-21: Restmüll, Spermüll',
    '2024-11-28: Biomüll',
    '2024-12-01: 1. Advent',
    '2024-12-02: Giftmobil',
    '2024-12-03: Gelber Sack',
    '2024-12-05: Restmüll',
    '2024-12-06: Papiertonne',
    '2024-12-08: 2. Advent',
    '2024-12-12: Biomüll',
    '2024-12-15: 3. Advent',
    '2024-12-17: Gelber Sack',
    '2024-12-19: Restmüll',
    '2024-12-22: 4. Advent',
    '2024-12-24: HI.Abend 4. Advent',
    '2024-12-25: 1. Weihnachtsfeiertag',
    '2024-12-26: 2. Weihnachtsfeiertag',
    '2024-12-27: Biomüll',
    '2024-12-31: Gelber Sack, Silvester'
];


// Function to convert text elements to events
function createEventsFromTextElements(textElements) {
    return textElements.map(text => {
        // Extract date and title from text (assuming a specific format)
        const [dateString, title] = text.split(': '); // Adjust split logic based on your data format
        
        const eventDateString = dateString + 'T00:00:00Z';
        console.log(eventDateString, title);

        return {
            start: eventDateString, 
            end: eventDateString, 
            summary: title,
            allDay: true
        };
    });
}


// Create calendar
const calendar = ical({ name: '2024 Events Calendar' });

// Add events to calendar
createEventsFromTextElements(textElements).forEach(event => {
    calendar.createEvent(event);
});

// Save to file
fs.writeFileSync('abfallkalender-2024.ics', calendar.toString());
console.log('ICS file created successfully!');