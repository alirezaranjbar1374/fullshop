import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
// import { ApiGetService } from '../../../public/Util/Baseyurlget';
import VerifiedIcon from '@mui/icons-material/Verified';
import axios from 'axios'

interface productDetailstypes{
  name:string
}


 interface UserComents{
  _id:string;
  commpleted:string;
  text:string;
  UserName:string;
  score?:number,
  productDetails :productDetailstypes

 }
interface User {
  id: number;
  name: string;
  email: string;
}
type fulldata=UserComents[]






const UserTable: React.FC = () => {
  const [usercoment,setUserComent]=useState<UserComents[]>([])
  const [page, setPage] = useState(0);
//   const apiService = new ApiGetService('url');

  useEffect(() => {
    const fetchData = async () => {
      try {

        axios.get("http://localhost:3001/api/product/getProductComments").then(res=>{
            console.log("result",res);

            setUserComent(res.data);


        }).catch(err=>{

        })

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);




  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedUser, setSelectedUser] = useState<UserComents | null>();
  const [open, setOpen] = useState(false);
const [idcoment,setIdcoment]=useState<string>("")
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRowClick = (user: UserComents) => {
    setSelectedUser(user); // ذخیره اطلاعات کاربر انتخاب شده
    setOpen(true);
    setIdcoment(user._id);
     // باز کردن مدال
   
    


    
  };

  const handleClose = () => {
    setOpen(false); // بستن مدال
    setSelectedUser(null); // پاک کردن اطلاعات کاربر
  };

  const handelComent=(event: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
    event.preventDefault();

    const data={
      "_id":idcoment
    }


    axios.post("http://localhost:3001/api/product/Completedcoments",data).then(res=>{
        alert("باموفقیت اضافه شد")
        console.log("res",res);
    }).catch(err=>{
        console.log("err",err);
    })

    setOpen(false); 
  }


  const paginatedUsers = usercoment.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <TableContainer dir='rtl' component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ایدی</TableCell>
            <TableCell>نام کاربر</TableCell>
            <TableCell>امتیاز</TableCell>
            <TableCell>نام محصول</TableCell>
            <TableCell> تایید</TableCell>


          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedUsers.map((user,index) => (
            <TableRow 
              key={user._id} 
              hover
            >
              <TableCell>{index}</TableCell>
              <TableCell>{user.UserName}</TableCell>
              <TableCell>{user.score?user.score:5}</TableCell>
              <TableCell>{user.productDetails.name}</TableCell>
              <TableCell                style={{ cursor: 'pointer' }}
             onClick={() => handleRowClick(user)}
>{user.commpleted?<VerifiedIcon color='success'/>:<VerifiedIcon color='error'/>}</TableCell>


            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
      dir='rtl'

        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={usercoment.length}
        rowsPerPage={rowsPerPage}
        page={page}
        labelRowsPerPage="تعداد ردیف‌ها در هر صفحه:" 

        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Dialog برای نمایش اطلاعات کاربر */}
      <Dialog dir='rtl' open={open} onClose={handleClose}>
        <DialogTitle>کامنت کاربر</DialogTitle>
        <DialogContent>
          {selectedUser && (
            <>
              <p><strong>نام کاربری:</strong> {selectedUser.UserName}</p>
              <p><strong>متن:</strong> {selectedUser.text}</p>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">بستن</Button>
          <Button onClick={handelComent} color="primary">تایید</Button>

        </DialogActions>
      </Dialog>
    </TableContainer>
  );
};

export default UserTable;