import trash from "../assets/apiClients/trash.png";
import eye from "../assets/apiClients/eye.png";
import copy from "../assets/apiClients/copy.png";

const clients = [
  { id: "client1", key: "*******", name: "Client 1" },
  { id: "client1", key: "*******", name: "Client 2" },
];

export const ApiClient = () => {
  return (
    <div className=" bg-[#E9EFEC] rounded-[35px] shadow-md ml-[35px] border border-[#92e3a9]  mt-[25px] mr-[31px] h-screen">
      <div className="p-0 mr-[28.25px] ml-[43px] mt-[49px]">
        <div className="flex justify-between items-center  h-[42px]   ">
          <h1 className="text-2xl font-bold ml-[27.1px]  ">API Clients</h1>
          <button className=" bg-[#00432f] w-[175px] h-full text-white rounded-[10px] text-lg font-semibold items-center">
            Add Api Clients
          </button>
        </div>
        <div className="flex justify-between items-center py-4  border-b border-gray-300 pr-10 ">
          <span>Client Id</span>
          <span>Client Key</span>
          <span>Client 1</span>
          <span>Actions</span>
        </div>
        <div className=" flex  flex-col gap-[42px] ml-0">
          {clients.map((client) => (
            <div
              key={client.id}
              className="flex justify-between items-center py-4 rounded-lg font-bold h-[24px] text-[18px] "
            >
              <span>{client.id}</span>
              <span>{client.name}</span>
              <span>{client.key}</span>
              <div className="flex space-x-3">
                <img src={trash} alt="Delete" className="w-5 cursor-pointer" />
                <img src={copy} alt="Copy" className="w-5 cursor-pointer" />
                <img src={eye} alt="View" className="w-5 cursor-pointer" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApiClient;
