import AdminLayout from "./AdminLayout";

export default function Authenticated({ user, header, children }) {
  return <AdminLayout>{children}</AdminLayout>;
}
