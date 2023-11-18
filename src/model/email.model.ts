import { AppDataSource } from "../config/db";
import { hashPassword } from "../config/utilies";
import { ExcelData } from "../entities/excelData";

export async function addExcelData(data: any, callback: any) {
    try {
        const excelDataRepository = AppDataSource.getRepository(ExcelData);

        const res = JSON.parse(JSON.stringify(data));

        await AppDataSource
            .createQueryBuilder()
            .insert()
            .into(ExcelData)
            .values(res)
            .returning('*')
            .execute()
            .then((result) => {
                console.log(result, 'result');
                return callback('', result.raw[0])
            }).catch((err) => {
                return callback(err, '')
            });


    } catch (error: any) {
        console.log(error);
        return callback(error, '')
    }
}
