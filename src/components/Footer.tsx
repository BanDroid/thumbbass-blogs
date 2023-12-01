import SvgIcons from "@/utils/icons";

export default function Footer() {
  return (
    <footer className="footer footer-center p-10 bg-neutral text-neutral-content">
      <div className="grid grid-flow-col gap-4">
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Services</a>
      </div>
      <div>
        <div className="grid grid-flow-col gap-4">
          <a>
            <SvgIcons name="telegram" />
          </a>
          <a>
            <SvgIcons name="youtube" />
          </a>
          <a>
            <SvgIcons name="facebook" />
          </a>
        </div>
      </div>
      <div>
        <p>Copyright © 2023 - All right reserved by ThumbBass</p>
      </div>
    </footer>
  );
}
