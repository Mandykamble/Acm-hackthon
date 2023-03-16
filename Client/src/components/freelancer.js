import React ,{useState,useEffect} from "react";



const Freelancer =({state,address})=>{
    const [account,setAccount]=useState("No account connected");
    const [registeredemps,setRegisteredemps]=useState([]);
    const [createaccnt,setCreateaccnt]=useState([]);


  useEffect(() => {
      const getAccounts =async()=>{
          const {web3}=state;
          const accounts =await web3.eth.getAccounts(); 	
          console.log(accounts);
          setAccount(accounts[0]);
      }

     state.web3 && getAccounts();
     
  },[state,state.web3]);

  useEffect(() => {
    const getEmps  =async()=>{
        const {contract}=state;
        const Emps =await web3.eth.getAccounts(); 	
        console.log(accounts);
        setAccount(accounts[0]);
    }

   state.web3 && getAccounts();
   
},[state,state.web3]);

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

        <li className="list-group-item">
          <b> Job posted : </b>{wjob}
          <button className="button1"  onClick={etjob}>
            View Job posted
          </button>
        </li>
      </div>
    </ul>













   

    </>;
};

export default Freelancer;