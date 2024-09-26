import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export default function RoleAlert() {
  return (
    <Alert>
      <AlertTitle>Limited Access</AlertTitle>
      <AlertDescription>
        You do not have permission to access this page.
      </AlertDescription>
    </Alert>
  );
}
