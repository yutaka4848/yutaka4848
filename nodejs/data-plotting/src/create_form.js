/*
    Please insert these modules into html.(<script type="module">)
        -> fetch_csv_data.js
        -> proc_csv.js
*/

let rootElem = document.currentScript.parentElement;

class ChartParameters extends React.Component {
    constructor(props) {
        super(props);
        this.state = { dataList: [], dataSelect: "", fieldSelect: [] };

        this.handleChange = this.handleChange.bind(this);
        this.handleAddField = this.handleAddField.bind(this);
        this.handleDelField = this.handleDelField.bind(this);

        this.handleClick = this.handleClick.bind(this);
        this.createSelectList = this.createSelectList.bind(this);

        this.chart = new Chart(document.querySelector("#chart_field"), {
            type: "bar", options: {
                responsive: false,
                aspectRatio: 16 / 9,
                plugins: {
                    title: {
                        display: true,
                        text: "Vital Statistics"
                    }
                }
            }
        });

    }

    async componentDidMount() {
        let res = await fetch("/api/list");
        const dataList = (await res.json()).list;

        this.setState({ dataList, dataSelect: dataList[0] });

        this.modules = await import("/scripts/fetch_csv_data.js");
    }

    createSelectList() {
        let result = [];

        try {
            this.state.dataList.forEach((val, idx) => {
                result.push(<option key={`data_list_${idx}`} value={val}>{val}</option>);
            });
        } catch (err) {
            result.push("Error");
        }

        return (<select>{result}</select>);
    }

    handleChange({ target }) {
        this.setState({ dataSelect: target.value });
    }

    handleAddField(event) {
        let field_list = document.querySelector("select[id='field_list']");
        let select_field = document.querySelector("select[id='select_field']");
        let field = document.createElement("option");

        field.textContent = field_list.value;
        select_field.appendChild(field);

        for (let elem of field_list) {
            if (field_list.value == elem.value) {
                elem.setAttribute("disabled", true);
                elem.setAttribute("hidden", true);
            }
        }

        this.setState(state => {
            state.fieldSelect.push(field_list.value);
        });
    }

    handleDelField(event) {
        let field_list = document.querySelector("select[id='field_list']");
        let select_field = document.querySelector("select[id='select_field']");

        for (let elem of select_field) {
            if (select_field.value == elem.value) {
                elem.setAttribute("disabled", true);
                elem.setAttribute("hidden", true);
            }
        }

        for (let elem of field_list) {
            if (select_field.value == elem.value) {
                elem.removeAttribute("disabled");
                elem.removeAttribute("hidden");
            }
        }

        this.setState(state => {
            state.fieldSelect = state.fieldSelect.reduce((res, val) => {
                if (val != select_field.value) res.push(val);
                return res;
            }, []);
        });
    }

    async handleReplot({ target }) {
        const formData = new FormData(document.querySelector("form[id='parameters']"));
        const column = this.state.fieldSelect;

        if (column.length > 0) {
            this.modules.createChart(this.chart, this.csvTable, {
                label_field: this.fieldNames[0], column
            });
        }
    }

    async handleClick({ target }) {
        const formData = new FormData(document.querySelector("form[id='parameters']"));
        const filename = this.state.dataSelect;
        const remove = [" ", "　", new RegExp("Se\\d{2}", "g")]; // to replaceAll

        this.csvTable = await this.modules.requestCsvData({
            filename, remove
        });

        this.fieldNames = this.csvTable.getFeildNames;
        this.modules.createChart(this.chart, this.csvTable, {
            label_field: this.fieldNames[0],
            column: [this.fieldNames[1]]
        });

        if (!this.fieldList) {
            this.fieldList = ReactDOM.createRoot(document.querySelector("select[id='field_list']"));
            this.selectField = ReactDOM.createRoot(document.querySelector("select[id='select_field']"));
        }

        let count = 0;
        let fieldGroup = [];

        for (const field of this.fieldNames) {
            if (field) {
                fieldGroup.push(<option key={`field${count}_${field}`} value={field}>{field}</option>);
                count++;
            }
        }
        this.fieldList.render(fieldGroup);

        fieldGroup = fieldGroup.map(v => {
            v.props.disabled = true;
            v.props.hidden = true;
        });
        this.selectField.render(fieldGroup);

        this.setState({fieldSelect: []});
    }

    render() {
        return (
            <form name="parameters" id="parameters" className="d-flex flex-column justify-content-center">
                <fieldset id="data_list" name="data_list" className="d-flex flex-row justify-content-evenly" onChange={this.handleChange}>
                    <div className="p-2">
                        {this.state.dataList && this.createSelectList()}
                    </div>
                    <div className="p-2">
                        <button onClick={(e) => this.handleClick(e)} name="fetch_data" id="fetch_data" className="btn btn-primary rounded" type="button" value="read_data">Read</button>
                    </div>
                </fieldset>
                <fieldset id="field" name="field" className="d-flex flex-row justify-content-evenly">
                    <select id="field_list" className="p-2" size={5} style={{ width: "10rem" }}></select>
                    <div className="d-flex flex-column align-items-center">
                        <button type="button" value="add_field" className="btn rounded" onClick={this.handleAddField}>
                            <div className="shape_arrow">
                                <div className="shape_arrow_body"></div>
                                <div className="shape_arrow_head right_head"></div>
                            </div>
                        </button>
                        <button type="button" value="del_field" className="btn rounded" onClick={this.handleDelField}>
                            <div className="shape_arrow">
                                <div className="shape_arrow_body left_body"></div>
                                <div className="shape_arrow_head left_head"></div>
                            </div>
                        </button>
                    </div>
                    <select id="select_field" className="p-2" size={5} style={{ width: "10rem" }}></select>
                    <div className="p-2">
                        <button onClick={(e) => this.handleReplot(e)} name="plot" id="plot" className="btn btn-primary rounded" type="button" value="plot">PLOT</button>
                    </div>
                </fieldset>
            </form >
        )
    }
}

let root = ReactDOM.createRoot(rootElem);
root.render(<ChartParameters />);