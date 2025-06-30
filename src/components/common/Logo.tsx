import logoDark from "/src/assets/Navbar/dark-logo.png";
import logoLight from "/src/assets/Navbar/light-logo.png";

function Logo() {
  return (
    <div className="min-w-[134px] min-h-[41px] 2k:min-w-[200px] 2k:min-h-[61px]]">
      <img
        src={logoDark}
        alt="Logo"
        className="w-[134px] h-[41px] hidden dark:block 2k:w-[200px] 2k:h-[61px] object-fill"
      />
      <img
        src={logoLight}
        alt="Logo"
        className="w-[134px] h-[41px] dark:hidden 2k:w-[200px] 2k:h-[61px] object-fill"
      />
    </div>
  );
}

export default Logo;
