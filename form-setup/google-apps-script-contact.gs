/**
 * GPIDN "Contact Us" form  →  Google Sheet  (SEPARATE from the newsletter sheet)
 * ------------------------------------------------------------------
 * SETUP (make a brand-new sheet for this — do NOT reuse the newsletter one)
 * 1. Create a NEW Google Sheet (sheets.new). Leave the tab name as "Sheet1".
 * 2. Extensions ▸ Apps Script. Delete any code, paste THIS file.
 * 3. Deploy ▸ New deployment ▸ (gear) Web app.
 *      - Execute as:      Me
 *      - Who has access:  Anyone
 *    Deploy, authorise, and COPY the "Web app URL".
 * 4. Send Egid that URL (it will be different from the newsletter one).
 *
 * Export to Excel anytime: File ▸ Download ▸ Microsoft Excel (.xlsx)
 */

const SHEET_NAME = 'Sheet1';

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    const p = e.parameter;

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'Full Name', 'Email', 'Phone', 'Location', 'Message']);
    }

    sheet.appendRow([
      new Date(),
      p['Full-Name']     || '',
      p['Email-Address'] || '',
      p['Phone-Number']  || '',
      p['Location-2']    || '',
      p['Message']       || ''
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
