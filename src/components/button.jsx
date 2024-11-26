export default function SubmitButton(
  {text, type, desabled}) {
  return(
    <div className="input-controller">
    <button className="submit-button" 
     type={type} desabled={desabled}>
      {text}
    </button>
   </div> 
 )
}