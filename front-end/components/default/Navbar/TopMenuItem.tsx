import Link from "next/link";

interface TopMenuItemProp{
    title : string;
    pageRef : string;
}
export default function TopMenuItem(props : TopMenuItemProp){
    return(
        <Link href={props.pageRef} className="text-gray-200  text-xl ml-4" >
            {props.title}
        </Link>
    )
};