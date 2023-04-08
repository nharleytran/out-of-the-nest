import {
    TextInput,
    Container,
    Title,
    Textarea,
    NumberInput,
    Checkbox,
    Button,
    Group,
    Box,
    Select,
    Radio
  } from "@mantine/core";
import { useNavigate, useLocation, Link } from "react-router-dom";
import '../App.css'

function Personalize(props) {
    const { posts } = props;
    const navigate = useNavigate();
    console.log(posts)
    return (
        <div className="personalize-button">
            <Button
            onClick={() => {
              navigate("/questionnaire", { state: { posts } })            
            }}
        >
            See how you compare to other posters here!
        </Button>
      </div>
    )
}

export default Personalize;