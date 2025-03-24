import { useNavigate } from 'react-router';

export function Page404() {
   const navigate = useNavigate();
   return (
      <div>
         <h1>Not Found</h1>
         <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
   );
}
