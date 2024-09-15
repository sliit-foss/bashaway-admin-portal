import { twMerge } from "tailwind-merge";

const Folder = ({ className, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      fill="none"
      className={twMerge("w-8 h-8", className)}
      {...props}
    >
      <path
        d="M4 12V9C4 8.20435 4.31607 7.44129 4.87868 6.87868C5.44129 6.31607 6.20435 6 7 6H11.172C11.4367 6.00006 11.6906 6.10506 11.878 6.292L14.586 9L11.878 11.708C11.6906 11.8949 11.4367 11.9999 11.172 12H4ZM7 4C5.67392 4 4.40215 4.52678 3.46447 5.46447C2.52678 6.40215 2 7.67392 2 9V23C2 24.3261 2.52678 25.5979 3.46447 26.5355C4.40215 27.4732 5.67392 28 7 28H25C26.3261 28 27.5979 27.4732 28.5355 26.5355C29.4732 25.5979 30 24.3261 30 23V13C30 11.6739 29.4732 10.4021 28.5355 9.46447C27.5979 8.52678 26.3261 8 25 8H16.414L13.294 4.88C13.0152 4.60087 12.6841 4.37946 12.3196 4.22846C11.9552 4.07746 11.5645 3.99982 11.17 4H7ZM18 10V15C18 15.2652 18.1054 15.5196 18.2929 15.7071C18.4804 15.8946 18.7348 16 19 16H20V18H19C18.7348 18 18.4804 18.1054 18.2929 18.2929C18.1054 18.4804 18 18.7348 18 19C18 19.2652 18.1054 19.5196 18.2929 19.7071C18.4804 19.8946 18.7348 20 19 20H20V22H19C18.7348 22 18.4804 22.1054 18.2929 22.2929C18.1054 22.4804 18 22.7348 18 23C18 23.2652 18.1054 23.5196 18.2929 23.7071C18.4804 23.8946 18.7348 24 19 24H20V26H7C6.20435 26 5.44129 25.6839 4.87868 25.1213C4.31607 24.5587 4 23.7956 4 23V14H11.172C11.9674 13.9993 12.7299 13.6828 13.292 13.12L16.414 10H18ZM22 26V22H23C23.2652 22 23.5196 21.8946 23.7071 21.7071C23.8946 21.5196 24 21.2652 24 21C24 20.7348 23.8946 20.4804 23.7071 20.2929C23.5196 20.1054 23.2652 20 23 20H22V16H23C23.2652 16 23.5196 15.8946 23.7071 15.7071C23.8946 15.5196 24 15.2652 24 15V10H25C25.7956 10 26.5587 10.3161 27.1213 10.8787C27.6839 11.4413 28 12.2044 28 13V23C28 23.7956 27.6839 24.5587 27.1213 25.1213C26.5587 25.6839 25.7956 26 25 26H22ZM22 10V14H20V10H22Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default Folder;