import { AppDataSource } from "../config/db";
import * as dbf from 'dbf';
import { Dbf } from 'dbf-reader';
import { DataTable } from 'dbf-reader/models/dbf-file';
import { Import_dbf } from "../entities/w0t409";

const xlsx = require('xlsx');
const { google } = require('googleapis');
const { OAuth2Client } = require('google-auth-library');
const fs = require('fs');
const credentials = JSON.parse(fs.readFileSync('src/config/client.json'));
const { client_id, client_secret, redirect_uris } = credentials.web;
const oAuth2Client = new OAuth2Client(client_id, client_secret, redirect_uris[0]);

const REFRESH_TOKEN = "1//04NSGwowVQIUJCgYIARAAGAQSNwF-L9IriO51tYS3QVxBW4X37QPKpbuoRl52MR4Y6l5UwA7-1pxOYqkIMhV0kNA_K6FtCl-0ZbQ"

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function listMessages(query: any) {
    const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });
    const response = await gmail.users.messages.list({
        userId: 'me',
        q: query,
    });
    console.log('response', response);
    return response.data.messages;
}

async function getMessage(messageId: any) {
    const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });
    const response = await gmail.users.messages.get({
        userId: 'me',
        id: messageId,
    });
    // console.log(response.data, 'response.data');
    return response.data;
}

// async function getAttachments(message: any) {
//     console.log('*****');
//     const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });
//     const parts = message.payload.parts;
//     if (!parts) {
//         console.log('No attachments found in this email.');
//         return;
//     }
//     let allDataArr: any[] = []
//     let errorArr: any[] = [];
//     console.log('11')
//     for (const part of parts) {
//         if (part.filename && part.filename.length > 0 && part.filename.includes('.xls')) {
//             console.log('22')

//             const attachment = await gmail.users.messages.attachments.get({
//                 userId: 'me',
//                 messageId: message.id,
//                 id: part.body.attachmentId,
//             });
//             console.log(attachment, 'attachment');

//             const data = attachment.data.data;
//             const xlsFilePath = `${part.filename}`;

//             // Save attachment data to a local file
//             fs.writeFileSync(xlsFilePath, data, 'base64');
//             // const f = fs.readFileSync(xlsFilePath)
//             // console.log('test', f.length);
//             const workbook = xlsx.readFile(xlsFilePath, { encoding: 'utf-8' });
//             const sheetName = workbook.SheetNames[0]; // Assuming there's only one sheet
//             const worksheet = workbook.Sheets[sheetName];

//             const xlsData = xlsx.utils.sheet_to_json(worksheet);

//             const res = JSON.parse(JSON.stringify(xlsData));
//             console.log(res, 'res')
//             await AppDataSource
//                 .createQueryBuilder()
//                 .insert()
//                 .into(ExcelData)
//                 .values(res)
//                 .returning('*')
//                 .orIgnore(true)
//                 .execute()
//                 .then((result) => {
//                     // Clean up the local file
//                     console.log('success')
//                     allDataArr.push(result.raw)
//                 }).catch((err) => {
//                     console.log(err, 'err');
//                     if (err && err.driverError && err.driverError.detail && err.driverError.detail.includes("already exists.")) {
//                         const errorMsg = "Email already exists!"
//                         errorArr.push(errorMsg)
//                     } else {
//                         errorArr.push(err)
//                     }
//                 });

//             fs.unlinkSync(xlsFilePath);

//         }
//     }
//     console.log(allDataArr, 'allDataArr');
//     if (errorArr && errorArr.length > 0) {
//         console.log(errorArr, 'errorArr')
//         return errorArr
//     }
//     return allDataArr
// }



async function getAttachments(message: any) {
    console.log('*****')
    const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });
    const parts = message.payload.parts;
    if (!parts) {
        console.log('No attachments found in this email.');
        return;
    }
    console.log(parts, 'parts')
    let allDataArr: any[] = []
    let errorArr: any[] = [];
    for (const part of parts) {
        console.log('**************')

        if (part.filename && part.filename.length > 0 && part.filename.includes('.dbf')) {
            console.log('**************3')

            const attachment = await gmail.users.messages.attachments.get({
                userId: 'me',
                messageId: message.id,
                id: part.body.attachmentId,
            });

            const data = attachment.data.data;
            console.log(data, 'data')
            const dbfFilePath = `${part.filename}`;

            let records: any = [];
            await fs.writeFileSync(dbfFilePath, data, 'base64');
            let buffer: Buffer = fs.readFileSync(dbfFilePath)
            let datatable: DataTable = Dbf.read(buffer);
            if (datatable) {
                console.log(datatable, 'datatable')
                datatable.rows.forEach((row: any) => {
                    const lowercaseRow: any = {};
                    for (const key in row) {
                        if (Object.prototype.hasOwnProperty.call(row, key)) {
                            console.log('9999')
                            // if (key.toLowerCase() == 'prcode' || key.toLowerCase() == 'acno' || key.toLowerCase() == 'pin' || key.toLowerCase() == 'funddesc')
                            lowercaseRow[key.toLowerCase()] = row[key];
                        }
                    }
                    console.log(lowercaseRow, 'lowercaseRow');
                    records.push(lowercaseRow);
                    // datatable.columns.forEach((col: Column) => {
                    //     console.log(row);
                    // });
                });
            }
            console.log(records, 'dataRecords');


            if (records && records.length > 0) {

                const res = JSON.parse(JSON.stringify(records));

                await AppDataSource
                    .createQueryBuilder()
                    .insert()
                    .into(Import_dbf)
                    .values(res)
                    .returning('*')
                    .orIgnore(true)
                    .execute()
                    .then((result) => {
                        // Clean up the local file
                        console.log('success', result)
                        allDataArr.push(result.raw)
                    }).catch(async (err) => {
                        console.log(err, 'err');
                        await fs.unlinkSync(dbfFilePath);
                        if (err && err.driverError && err.driverError.detail && err.driverError.detail.includes("already exists.")) {
                            const errorMsg = "Email already exists!"
                            errorArr.push(errorMsg)
                        } else {
                            errorArr.push(err)
                        }
                    });

            } else {
                const error_msg = "Record not found"
                errorArr.push(error_msg)
            }

            await fs.unlinkSync(dbfFilePath);

        }
    }
    console.log(allDataArr, 'allDataArr');
    if (errorArr && errorArr.length > 0) {
        console.log(errorArr, 'errorArr')
        return errorArr
    }
    return allDataArr
}



export async function watchGmailInbox() {
    const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });
    // await gmail.users.watch(
    //     {
    //         userId: 'me',
    //         resource: {
    //             topicName: "projects/login-with-goggle-398805/topics/email-process", // Use the actual topic name
    //             callbackUrl: "http://localhost:3002/notifications"
    //         },
    //     },
    //     (err: any, res: any) => {
    //         if (err) {
    //             console.error('Error watching Gmail inbox:', err);
    //             return;
    //         }
    //         console.log('Watch request successful. You will receive notifications.', res);
    //         return res
    //     }
    // );


    const res = await gmail.users.watch({
        userId: 'me',
        requestBody: {
            'labelIds': ['INBOX'],
            topicName: "projects/login-with-goggle-398805/topics/email-process"
        },
    });

    console.log('Watch response:', res.data);

}

export const notifications = async () => {
    try {
        console.log('init')
        const query = 'from:hello.test2512@gmail.com';
        const messages = await listMessages(query);
        // console.log(messages, messages?.length, 'messages');
        if (!messages || messages?.length === 0) {
            console.log('No email found.');
            return "No email found!"
        }

        const messageId = messages[0].id;
        const message = await getMessage(messageId);

        console.log('Email Subject:', message.subject);
        console.log('Email Body:', message.snippet);

        const data = await getAttachments(message);
        console.log('end')
        return data

    } catch (e) {
        console.log(e, 'error123');
        return e
        // ErrorResponse(res, e);
    }
};
