import type { FC } from "react";
import { Card } from "@/shared/ui";
import type { ShopBranch } from "../../types/shopProfile.types";
import BranchList from "../BranchList";

interface BranchesSectionProps {
  branches: ShopBranch[];
  onAdd: () => void;
  onEdit: (branch: ShopBranch) => void;
  onToggle: (branch: ShopBranch) => void;
  onRemove: (branch: ShopBranch) => void;
}

const BranchesSection: FC<BranchesSectionProps> = (props) => (
  <Card padding="lg">
    <BranchList {...props} />
  </Card>
);

export default BranchesSection;
