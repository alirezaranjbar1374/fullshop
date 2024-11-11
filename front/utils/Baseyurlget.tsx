interface  datatpeparams{
  _id:string
}
export class ApiGetService {
    // let a:string="http://localhost:3001/api";
   public baseURL:string="";
    constructor(baseURL:string) {
      this.baseURL = "http://localhost:3001/api";
 
    }
    async fetchData(endpoint:string ) {
        const response = await fetch(`${this.baseURL}/${endpoint}`);
        const data = await response.json();
        return data;
      }
    async fetchDataWhiteParams(endpoint:string | number) {
      const response = await fetch(`${this.baseURL}/${endpoint}`);
      const data = await response.json();
      return data;
    }

    async fetchDatabasketuser(endpoint:string | number,userId:string|number) {
      const response = await fetch(`${this.baseURL}/${endpoint}/${userId}`);
      const data = await response.json();
      return data;
    }




    async postDataBasket(endpoint:string | number,body:any){
      const res:any = await fetch(`${this.baseURL}/${endpoint}`, {
        
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        
        body: JSON.stringify(body)
 

        
      });
    }



    async createWish(data:any,paramsurl:string) {
      console.log("data",data,"paramsurl",paramsurl);
      
      const response = await fetch(`${this.baseURL}/${paramsurl}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.status==202) {
        console.log("data tekrara");
      
    
      }
      // if (!response.ok) {
      //   throw new Error(Error creating post: ${response.statusText});
      // }
  
      const postData = await response.json();
      console.log("postData",postData);
      
      return postData;
    }

    async fetchDataComment(endpoint:string | number) {
      const response = await fetch(`${this.baseURL}/${endpoint}`);
      const data = await response.json();
      return data;
    }



    async RemoveDataBasket(endpoint:string | number,body:any){
      const res:any = await fetch(`${this.baseURL}/${endpoint}`, {
        
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        
        body: JSON.stringify(body)
 

        
      });
    }


  
    async Completedcomment(paramsurl:string,data:datatpeparams,) {
      console.log("data",data,"paramsurl",paramsurl);
      
      const response = await fetch(`${this.baseURL}/${paramsurl}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      // if (response.status==400) {
      //   console.log("data tekrara");
      
    
      // }
      // if (!response.ok) {
      //   throw new Error(Error creating post: ${response.statusText});
      // }
  
      const postData = await response.json();
      console.log("postData",postData);
      
      return postData;
    }


    async UserUpdate(paramsurl:string,data:any) {
        
      const response = await fetch(`${this.baseURL}/${paramsurl}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      // if (response.status==400) {
      //   console.log("data tekrara");
      
    
      // }
      // if (!response.ok) {
      //   throw new Error(Error creating post: ${response.statusText});
      // }
  
      const postData = await response;
      console.log("postData",postData);
      
      return postData;
    }
    
 
    async fetchUserData(endpoint:string | number,id:string | number,) {
      const response = await fetch(`${this.baseURL}/${endpoint}/${id}`);
      const data = await response.json();
      return data;
    }




    async postCommentproduct(endpoint:string | number,id:string| number | undefined,body:any){
      const res = await fetch(`${this.baseURL}/${endpoint}/${id}`, {
        
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        
        body: JSON.stringify(body)
     

        
      });
      if(res.status==201){
        alert("succc")
    }
    }


  }