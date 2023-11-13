/*
    constructor arguement
        csvParser: csv-parse instancce
        header: check additional infomation of head and search field name
*/

export class CSVTable {
    constructor(csvParser, { header } = { header: true }) {
        this.data = Array.from(csvParser);

    }

    get getData() { return this.data };

    get getFeildNames() { return Object.keys(this.data[0]) };
    getLabels(field_name) { return this.data.map(v => v[field_name])};

    getField(field_name) {
        let col = field_name;
        if (typeof field == "number") {
            col = this.getFeildNames.findIndex(v => v == field);
        }

        return this.data.map(v => v[col])
    }

    deleteNullFields() {
        let data = this.getData;

        for (const key of Object.keys(data[0])) {
            let fieldNullorNot = data.every(v => !v[key]);

            if (fieldNullorNot) data = data.map(v => {
                delete v[key];
                return v;
            });
        }
    }
}