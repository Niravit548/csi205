
const AppFooter = () => {
  return (
    <footer className="footer-co bg-gray-100 py-4 mt-8 footer text-center">
      <div className="footer-text mb-3">
        <h3 className="text-sm md:text-base font-medium">
          มหาวิทยาลัยศรีปทุม คณะเทคโนโลยีสารสนเทศ
          สาขาวิทยาการคอมพิวเตอร์และนวัตกรรมการพัฒนาซอฟต์แวร์
        </h3>
      </div>

      <div className="flex justify-center gap-4 ">
        <a
          href="https://www.facebook.com/SPUsripatmuniversity/?locale=th_TH"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="./images/Facebooklogo.png" width={68} height={68} alt="Facebook" />
        </a> &nbsp;

        <a
          href="https://www.instagram.com/sripatum_spu/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="./images/iglogo.jpg" width={68} height={68} alt="Instagram" />
        </a>
      </div>
    </footer>
  );
};

export default AppFooter;
