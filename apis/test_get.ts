import { test_kind_enum } from "../interfaces/test_get_type"

export const test_get = async (subject: string, field: string, kind: test_kind_enum) => {

    // TODO: 指定された先生の授業のなにかをとってくる
    // [{}]: Array<test_object>

    return [
        {
            file_url: "https://www.jumang-potaru.dev",
            insert_date: new Date(),
            nendo: 2020,
            kind: test_kind_enum.kimatsu,
            field: "sy",
            subject: "cn02"
        },
        {
            file_url: "https://www.google.com",
            insert_date: new Date(),
            nendo: 2021,
            kind: test_kind_enum.kimatsu,
            field: "cn",
            subject: "fu09"
        }
    ]
}