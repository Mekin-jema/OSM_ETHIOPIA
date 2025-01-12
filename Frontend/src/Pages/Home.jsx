import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import "primeicons/primeicons.css";

const clients = [
  { id: 1, key: "******", name: "Client 1" },
  { id: 2, key: "******", name: "Client 2" },
  { id: 3, key: "******", name: "Client 3" },
];
const Home = () => {
  return (
    <div>
      <DataTable value={clients} tableStyle={{ minWidth: "50rem" }}>
        <Column field="id" header="Id"></Column>
        <Column field="name" header="Client Name"></Column>
        <Column field="key" header="API key"></Column>
        <Column field="icons" header="Quantity">
          <i className="pi pi-check" style={{ fontSize: "1rem" }}></i>
          <i className="pi pi-times" style={{ fontSize: "1.5rem" }}></i>
          <i className="pi pi-search" style={{ fontSize: "2rem" }}></i>
          <i className="pi pi-user" style={{ fontSize: "2.5rem" }}></i>
        </Column>
      </DataTable>
    </div>
  );
};

export default Home;
