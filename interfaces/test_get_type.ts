export enum test_kind_enum {
    kimatsu,
    chukan,
    taisaku,
    report,
    folder
}

export interface test_object {
    id?: string,
    file_url: string, 
    insert_date: Date,
    nendo: number,
    kind: test_kind_enum,
    field: string,
    subject: string,
    delete_flg?: boolean
}