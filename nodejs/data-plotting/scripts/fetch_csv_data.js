
import { CSVTable } from "/scripts/proc_csv.js";

export async function requestCsvData({ filename, remove } = { remove: [] }) {
    const options = { method: "GET" };
    let fetchData = await fetch(`/api/csv/${filename}`);

    const data = await fetchData.text();
    const parser = csv_sync.parse(data, {
        skip_empty_lines: true, trim: true, relax_column_count: true,
        group_columns_by_name: true,
        columns: function (field_names) {
            return field_names.map((val, idx) => val ? val : `field${idx}`);
        },
        on_record: function (rec, info) {
            let result = {};

            for (const [k, v] of Object.entries(rec)) {
                if (remove.length) {
                    let removedStr = v;
                    try {
                        remove.forEach(reg => {
                            removedStr = removedStr.replaceAll(reg, "");
                        });
                    } catch (err) {

                    } finally {
                        result[k] = removedStr;
                    }
                } else
                    result[k] = v;

            }
            return result;
        },
        cast: true
    });
    
    let table = new CSVTable(parser);
    table.deleteNullFields();

    return table;
}

export function createChart(chart, tableData, { label_field, column } = { label_field: "",column: [] }) {
    const labels = tableData.getLabels(label_field);
    let data, label;
    let datasets = [];

    if (column.length == 0) {
    } else {
        for (const c of column) {
            data = tableData.getField(c);
            label = c;
            datasets.push({ data, label });
        }
    }

    chart.data.labels = labels;
    chart.data.datasets = datasets;

    chart.update();
}