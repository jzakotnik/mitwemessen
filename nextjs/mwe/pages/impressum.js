import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

export default function Impressum() {
  return (
    <div>
      <Typography variant="body2" color="text.secondary" align="center">
        Auch ein Lunch Profil speichern:
        <Link color="inherit" href={process.env.NEXT_PUBLIC_API_ENDPOINT + "/"}>
          Hier entlang
        </Link>
      </Typography>
      <Typography variant="body2" color="text.secondary" align="center">
        {"Impressum "}
        <Link color="inherit" href="https://github.com/jzakotnik">
          jzakotnik github
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </div>
  );
}
