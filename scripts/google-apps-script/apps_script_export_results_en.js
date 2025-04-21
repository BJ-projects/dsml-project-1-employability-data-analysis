/**
 * Adds a menu item to run the export function
 */
function onOpen() {
    const ui = SpreadsheetApp.getUi();
    ui.createMenu('Export Tools')
        .addItem('Export all Tabs to individual Excel Files', 'exportSheetsToExcel')
        .addToUi();
}

/**
 * Exports each sheet in the current spreadsheet to separate Excel files
 * Each file will be named "results_{tab_name}.xlsx" and stored in the same folder
 * as the original spreadsheet, with proper timestamp preservation
 * Adds a new column C with "cohort_start_month" header and "YYYY-MM" value based on sheet name
 */
function exportSheetsToExcel() {
    // Get the active spreadsheet
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheets = spreadsheet.getSheets();

    // Get the folder where the spreadsheet is located
    const spreadsheetId = spreadsheet.getId();
    const spreadsheetFile = DriveApp.getFileById(spreadsheetId);
    const parentFolder = spreadsheetFile.getParents().next();

    // Log info for debugging
    console.log("Starting export process)...");
    console.log("Spreadsheet name: " + spreadsheet.getName());
    console.log("Number of sheets to export: " + sheets.length);

    // Process each sheet
    for (let i = 0; i < sheets.length; i++) {
        const sheet = sheets[i];
        const sheetName = sheet.getName();

        console.log("Processing sheet: " + sheetName);

        try {
            // Create a new, temporary spreadsheet containing only this sheet
            const tempSpreadsheet = SpreadsheetApp.create("Temp - " + sheetName);
            const tempSheet = tempSpreadsheet.getActiveSheet();

            // Copy data from the original sheet
            const sourceRange = sheet.getDataRange();
            const sourceValues = sourceRange.getValues();
            const numRows = sourceValues.length;
            const numCols = sourceValues[0].length;

            // Get the source formats for detection of date cells
            const sourceFormats = sourceRange.getNumberFormats();

            // Create an array to track date cells
            const dateTimeCells = [];

            // Find cells that are dates/timestamps
            for (let row = 0; row < numRows; row++) {
                for (let col = 0; col < numCols; col++) {
                    // Check if it's a date format (contains d/m or m/d patterns)
                    const format = sourceFormats[row][col];
                    const value = sourceValues[row][col];

                    // Check if the cell contains a date (either by format or being a date object)
                    if ((format.includes('d') && format.includes('m')) ||
                        (value instanceof Date)) {
                        dateTimeCells.push({ row: row, col: col, value: value });
                    }
                }
            }

            // Format sheet name as YYYY-MM for the new column
            // Expected format of sheetName is "YYYY.MM"
            let formattedMonth = "";
            if (/^\d{4}\.\d{2}$/.test(sheetName)) {
                formattedMonth = sheetName.replace(".", "-");
            } else {
                // If sheet name doesn't match expected format, use original name
                formattedMonth = sheetName;
            }

            // Create a new array with space for the extra column
            const newValues = [];
            for (let row = 0; row < numRows; row++) {
                const newRow = [];
                // Add first two columns (A and B)
                for (let col = 0; col < 2; col++) {
                    if (col < sourceValues[row].length) {
                        newRow.push(sourceValues[row][col]);
                    } else {
                        newRow.push("");
                    }
                }

                // Add new column (C) with the formatted month
                // First row gets the header "cohort_start_month"
                if (row === 0) {
                    newRow.push("cohort_start_month");
                } else {
                    newRow.push(formattedMonth);
                }

                // Add remaining columns (original C onwards becomes D onwards)
                for (let col = 2; col < numCols; col++) {
                    newRow.push(sourceValues[row][col]);
                }

                newValues.push(newRow);
            }

            // Resize the temp sheet to match the new dimensions (original + 1 column)
            tempSheet.insertRows(1, numRows - 1);
            if (numCols + 1 > 1) {
                tempSheet.insertColumns(1, numCols);  // +1 for the new column "cohort_start_month"
            }

            // Get the range to update with the new values
            const targetRange = tempSheet.getRange(1, 1, numRows, numCols + 1);

            // Set values with the additional column
            targetRange.setValues(newValues);

            // Adjust the dateTimeCells indices for cells after the new column
            for (const dateCell of dateTimeCells) {
                if (dateCell.col >= 2) {  // Column C or later in the original sheet
                    dateCell.col += 1;      // Shift by 1 to account for new column
                }
            }

            // Explicitly set formats for date cells
            for (const dateCell of dateTimeCells) {
                const cellValue = dateCell.value;

                // If it's a date object, format it as dd/mm/yyyy hh:mm:ss
                if (cellValue instanceof Date) {
                    const cell = tempSheet.getRange(dateCell.row + 1, dateCell.col + 1);
                    cell.setNumberFormat("dd/mm/yyyy hh:mm:ss");
                } else {
                    // For text dates, try to parse and format
                    try {
                        // Try to check if this is a text date in format "dd/mm/yyyy hh:mm:ss"
                        const dateParts = String(cellValue).split(' ');
                        if (dateParts.length === 2) {
                            const datePart = dateParts[0];
                            const timePart = dateParts[1];

                            if (datePart.includes('/') && timePart.includes(':')) {
                                const cell = tempSheet.getRange(dateCell.row + 1, dateCell.col + 1);
                                cell.setNumberFormat("dd/mm/yyyy hh:mm:ss");
                            }
                        }
                    } catch (e) {
                        console.log("Error formatting date cell:", e);
                    }
                }
            }

            // Get the formatting from the original sheet
            const fontColors = sourceRange.getFontColors();
            const fontFamilies = sourceRange.getFontFamilies();
            const fontSizes = sourceRange.getFontSizes();
            const fontWeights = sourceRange.getFontWeights();
            const fontStyles = sourceRange.getFontStyles();
            const backgrounds = sourceRange.getBackgrounds();
            const horizontalAlignments = sourceRange.getHorizontalAlignments();
            const verticalAlignments = sourceRange.getVerticalAlignments();

            // Create new format arrays with space for the extra column
            const newFontColors = [];
            const newFontFamilies = [];
            const newFontSizes = [];
            const newFontWeights = [];
            const newFontStyles = [];
            const newBackgrounds = [];
            const newHorizontalAlignments = [];
            const newVerticalAlignments = [];

            // Process each format array to insert the new column
            for (let row = 0; row < numRows; row++) {
                // Copy formatting for the new column from adjacent cells
                const newFontColorRow = [];
                const newFontFamilyRow = [];
                const newFontSizeRow = [];
                const newFontWeightRow = [];
                const newFontStyleRow = [];
                const newBackgroundRow = [];
                const newHorizontalAlignmentRow = [];
                const newVerticalAlignmentRow = [];

                // Add first two columns (A and B)
                for (let col = 0; col < 2; col++) {
                    if (col < fontColors[row].length) {
                        newFontColorRow.push(fontColors[row][col]);
                        newFontFamilyRow.push(fontFamilies[row][col]);
                        newFontSizeRow.push(fontSizes[row][col]);
                        newFontWeightRow.push(fontWeights[row][col]);
                        newFontStyleRow.push(fontStyles[row][col]);
                        newBackgroundRow.push(backgrounds[row][col]);
                        newHorizontalAlignmentRow.push(horizontalAlignments[row][col]);
                        newVerticalAlignmentRow.push(verticalAlignments[row][col]);
                    } else {
                        // Default formatting if column doesn't exist
                        newFontColorRow.push("#000000");
                        newFontFamilyRow.push("Arial");
                        newFontSizeRow.push(10);
                        newFontWeightRow.push("normal");
                        newFontStyleRow.push("normal");
                        newBackgroundRow.push("#ffffff");
                        newHorizontalAlignmentRow.push("general");
                        newVerticalAlignmentRow.push("bottom");
                    }
                }

                // Add new column (C) - use formatting from column B as reference
                const refCol = Math.min(1, fontColors[row].length - 1);
                newFontColorRow.push(fontColors[row][refCol]);
                newFontFamilyRow.push(fontFamilies[row][refCol]);
                newFontSizeRow.push(fontSizes[row][refCol]);
                newFontWeightRow.push(fontWeights[row][refCol]);
                newFontStyleRow.push(fontStyles[row][refCol]);
                newBackgroundRow.push(backgrounds[row][refCol]);
                newHorizontalAlignmentRow.push(horizontalAlignments[row][refCol]);
                newVerticalAlignmentRow.push(verticalAlignments[row][refCol]);

                // Add remaining columns (original C onwards becomes D onwards)
                for (let col = 2; col < numCols; col++) {
                    if (col < fontColors[row].length) {
                        newFontColorRow.push(fontColors[row][col]);
                        newFontFamilyRow.push(fontFamilies[row][col]);
                        newFontSizeRow.push(fontSizes[row][col]);
                        newFontWeightRow.push(fontWeights[row][col]);
                        newFontStyleRow.push(fontStyles[row][col]);
                        newBackgroundRow.push(backgrounds[row][col]);
                        newHorizontalAlignmentRow.push(horizontalAlignments[row][col]);
                        newVerticalAlignmentRow.push(verticalAlignments[row][col]);
                    }
                }

                newFontColors.push(newFontColorRow);
                newFontFamilies.push(newFontFamilyRow);
                newFontSizes.push(newFontSizeRow);
                newFontWeights.push(newFontWeightRow);
                newFontStyles.push(newFontStyleRow);
                newBackgrounds.push(newBackgroundRow);
                newHorizontalAlignments.push(newHorizontalAlignmentRow);
                newVerticalAlignments.push(newVerticalAlignmentRow);
            }

            // Apply the new formatting with the additional column
            targetRange.setFontColors(newFontColors);
            targetRange.setFontFamilies(newFontFamilies);
            targetRange.setFontSizes(newFontSizes);
            targetRange.setFontWeights(newFontWeights);
            targetRange.setFontStyles(newFontStyles);
            targetRange.setBackgrounds(newBackgrounds);
            targetRange.setHorizontalAlignments(newHorizontalAlignments);
            targetRange.setVerticalAlignments(newVerticalAlignments);

            // Copy column widths and add the new column
            for (let col = 0; col < 2; col++) {
                tempSheet.setColumnWidth(col + 1, sheet.getColumnWidth(col + 1));
            }

            // Set width for the new column C (use same width as column B)
            tempSheet.setColumnWidth(3, sheet.getColumnWidth(2));

            // Copy remaining column widths (original C onwards becomes D onwards)
            for (let col = 2; col < numCols; col++) {
                tempSheet.setColumnWidth(col + 2, sheet.getColumnWidth(col + 1));
            }

            // Copy row heights
            for (let row = 0; row < numRows; row++) {
                tempSheet.setRowHeight(row + 1, sheet.getRowHeight(row + 1));
            }

            // Set the sheet name in the temporary spreadsheet to match the original
            tempSheet.setName(sheetName);

            // Force recalculation of the spreadsheet
            SpreadsheetApp.flush();

            // Export as Excel using the advanced Drive API
            const tempSpreadsheetId = tempSpreadsheet.getId();
            const url = "https://www.googleapis.com/drive/v3/files/" + tempSpreadsheetId + "/export?mimeType=application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
            const token = ScriptApp.getOAuthToken();
            const response = UrlFetchApp.fetch(url, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });

            // Create the Excel file with the correct name in the parent folder
            const excelBlob = response.getBlob().setName("results_" + sheetName + ".xlsx");
            parentFolder.createFile(excelBlob);

            // Clean up the temporary spreadsheet
            DriveApp.getFileById(tempSpreadsheetId).setTrashed(true);

            console.log("Successfully exported sheet: " + sheetName);
        } catch (error) {
            console.error("Error exporting sheet " + sheetName + ": " + error.toString());
        }
    }

    console.log("Export process completed!");

    // Show a message to the user
    SpreadsheetApp.getUi().alert("Export completed! All sheets have been exported as separate Excel files to the same folder as this spreadsheet.");
}

