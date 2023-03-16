import React ,{useState,useEffect} from "react";
// import Djob from "./contracts/Djob.json";
import "./Cliant.css"
import getWeb3 from "../getWeb3";
import Djob from "../contracts/Djob.json";



const Cliant =({state})=>{
    const [account,setAccount]=useState("");
    const [cbalance,setCbalance]=useState(0);
    const [abalance,setAbalance]=useState("Dunno");
    const [wjob,setJob]=useState("Dunno");
    const [registereddemp,setRegistereddemp]=useState("No one Hired yet");
    const [postjob,setPostjob]=useState("No Job Posted yet");

    const [jname, setjname] = useState("built website");
    const [jdesc, setjdesc] = useState("just built");
    const [jbudget, setjbudget] = useState(500);
    const [jloc, setjloc] = useState("remote");
    const [jmod, setjmod] = useState("WFH");
    const [data, setData] = useState('');

    const contractAddress = '0xD36f91E6D111ad80931A8f42f87e835b14b189ed';
    const contractAbi = Djob.abi;

    const [ setState] = useState({
      web3: null,
      contract: null,
    });
    useEffect(() => {
      const init = async () => {
        try {
          const web3 = await getWeb3();
          const networkId = await web3.eth.net.getId();
  
          const deployedNetwork = Djob.networks[networkId];
          console.log("Contract Address:", deployedNetwork.address);
          const instance = new web3.eth.Contract(
            Djob.abi,
            deployedNetwork && deployedNetwork.address
          );
          const contract = new web3.eth.Contract(contractAbi, contractAddress);
          setState({ web3, contract: instance });
        } catch (error) {
          alert("Falied to load web3 or contract.");
          console.log(error);
        }

        const web3 = await getWeb3();
      const contract = new web3.eth.Contract(contractAbi, contractAddress);
      const fetchData= async()=>{
        const {contract}=state;
        const result = await contract.methods.getx().call();
        setData(result);
        console.log(result);
      }
      fetchData();
 
      };
      init();
          
    }, []);

    useEffect(() => {
        const getAccount =async()=>{
            const {web3}=state;
            const accounts =await web3.eth.getAccounts(); 	
            console.log(accounts);
            setAccount(accounts[0]);
        }

       state.web3 && getAccount();
        
       
    },[state,state.web3]);

    useEffect(() => {
        async function getBalance() {
            const {web3}=state;
          if (web3 && account) {
            const balanceInWei = await web3.eth.getBalance(account);
            const balanceInEth = web3.utils.fromWei(balanceInWei, "ether");
            setAbalance(balanceInEth);
            console.log(balanceInEth)
          }
        }
    
        getBalance();
      }, [state.web3, account]);


    const contractBalance= async()=>{
        const {contract}=state;

        const balance = await contract.methods.getbal().call({from:account});
        setCbalance(balance);
    }
   
    

   




    
    // const postJob= async()=>{
    //     const {contract}=state;

    //     const Job = await contract.methods.postjob("built website","just built",5,"remote","WFH").send({from:account});

    //     const jobs= await contract.methods.Jobs(0).call({from:account});
    //     setPostjob(Job);
    // }



  async function postJob() {
    setjname("App deveolpment");
      setjdesc("App deveolpment");
      setjbudget(100);
      setjloc("remote")
      setjmod("wfh")
  //     const {contra
      const {contract}=state;
      await contract.methods
        .postjob(jname,jdesc,jbudget,jloc,jmod)
        .send({from:account});
        

    }

   


    const getjob=async()=>{
        const {contract}=state;
        // const wjob= await contract.methods.Jobs[0].call({from:account});
        const wjob= await contract.methods.Jobs().call(0)({from:account});
        console.log(wjob);

       // setJob(wjob);
       
    }

  //   const getxval=async()=>{
  //     const {contract}=state;
  //     // const wjob= await contract.methods.Jobs[0].call({from:account});
  //     const x= await contract.methods.getx().call()({from:account});
  //     console.log(x);

  //    // setJob(wjob);
     
  // }

   

    // useEffect(()=>{
    //    const getcli=async()=>{
      
    //     const {contract}=state;
    //     const cliants = await contract.methods.getcliants().call();
    //     const registereddemp = cliants;
    //     console.log(registereddemp);
    //     setRegistereddemp(registereddemp);


    //   };
    //   state.contract && getcli();
    // },[state,state.contract]
    // );
    
    // contractBalance();
    // postJob();

    return <>


<ul className="list-group" id="list">
      <div className="center">
        <li className="list-group-item" aria-disabled="true">
          <b>Connected account :</b> {account}
        </li>
        <li className="list-group-item">
          <button className="button1" onClick={postJob}>
          Post Job
          </button>
        </li>
        <li className="list-group-item">
          <b>Account Balance : </b> {abalance} ETH
          <button className="button1" onClick={contractBalance}>
            Click For Balance
          </button>
        </li>

        {/* <li className="list-group-item">
          <b> Job  : </b>{wjob}
          <button className="button1"  onClick={fetchData}>
            View Job posted
          </button>
        </li> */}

        <li className="list-group-item">
        <div>
        {/* <button className="button1"  onClick={fetchData}>
            View 
          </button> */}
      <h1>{data}</h1>
      <p></p>
            </div>
        </li>




        
      </div>
    </ul>













   

    </>;
};

export default Cliant;