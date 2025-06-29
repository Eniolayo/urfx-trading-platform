import Checkbox from "/src/assets/HeroSection/checkbox.webp";


const CheckboxItem = ({checkBoxData} : {checkBoxData : string}) => {
    <div className="w-full h-full">
        <img src={Checkbox} alt="checkbox" className="w-[24px] h-[24px]"/>
        <span>{checkBoxData}</span>
    </div>
}

export default CheckboxItem;