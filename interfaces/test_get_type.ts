export enum test_kind_enum {
    kimatsu,
    chukan,
    taisaku
}

export interface test_object {
    file_url: string, 
    insert_date: Date,
    nendo: number,
    kind: test_kind_enum,
    field: string,
    subject: string
}