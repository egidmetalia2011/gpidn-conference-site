/**
 * GPIDN "Become a Member" form  →  Google Sheet
 * ------------------------------------------------------------------
 * Each form submission is appended as a new row. Download the sheet
 * as Excel anytime:  File ▸ Download ▸ Microsoft Excel (.xlsx)
 * ------------------------------------------------------------------
 * SETUP
 * 1. Create a new Google Sheet (sheets.new). Leave the tab name as "Sheet1".
 * 2. In that sheet: Extensions ▸ Apps Script. Delete any code, paste THIS file.
 * 3. Deploy ▸ New deployment ▸ (gear) Web app.
 *      - Execute as:      Me
 *      - Who has access:  Anyone
 *    Click Deploy, authorise, and COPY the "Web app URL".
 * 4. Send Egid that URL (or paste it into newsletter-form-handler.js).
 */

const SHEET_NAME = 'Sheet1';

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    const p = e.parameter;

    // Write a header row the first time
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'First Name', 'Last Name', 'Email',
                       'Organisation', 'Role', 'Country', 'Interests']);
    }

    sheet.appendRow([
      new Date(),
      p['First-Name'] || '',
      p['Last-Name'] || '',
      p['News-Letter-Email-2'] || p['Email'] || '',
      p['Organisation'] || '',
      p['Role'] || '',
      p['Country'] || '',
      (e.parameters['checkbox'] || []).join(', ')
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
