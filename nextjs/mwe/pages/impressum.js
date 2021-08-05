import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

export default function Impressum() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Impressum "}
      <Link color="inherit" href="https://github.com/jzakotnik">
        jzakotnik github
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
