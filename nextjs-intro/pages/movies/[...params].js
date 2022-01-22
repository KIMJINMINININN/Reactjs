//상세 페이지
import Seo from "../../components/Seo";
import {useRouter} from "next/router";

export default function Detail({ params }){
    const router = useRouter();
    const [title, id] = params || [];
    return(
        <div>
            <Seo title={title}>
                <h4>{title}</h4>
            </Seo>
        </div>
    );
};

export function getServerSideProps({ params: {params}}){
    return {
        props:{
            params,
        },
    };
}