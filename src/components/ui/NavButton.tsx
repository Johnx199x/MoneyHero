    import { useNavigate } from "react-router-dom";

interface NavButtonProps {
    navTo: string;
}

export default function NavButton({ navTo }: NavButtonProps) {
    const navigate = useNavigate()

    const onClick =(link : string)=>{
        navigate(`/${link}`)
    }
    return(
          <button className="button-x" type='button' onClick={() => onClick(navTo)}>Start Quest</button>
    )
}