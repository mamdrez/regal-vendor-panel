// import Icons from "@/shared/icons";
// import styles from "./styles.module.css";
// import TagColor from "@/features/settings/page/tags/components/TagColor";
// import tagColor from "@/features/settings/page/tags/json/tagColor.json";

// interface IProps {
//   name?: string;
//   color: string;
//   titleColor?: string;
//   onDelete?: () => void;
//   onEdit?: () => void;
// }

// const TagCard: React.FC<IProps> = ({ name, color, onDelete, onEdit }) => {
//   const tagColorData: any = tagColor;

//   const handleDelete = () => {
//     onDelete?.();
//   };

//   const handleEdit = () => {
//     onEdit?.();
//   };

//   return (
//     <div className={styles.tagCard}>
//       <div className={styles.tagCardEdit}>
//         <Icons
//           color="error"
//           name="Trash1"
//           size={1.2}
//           onClick={handleDelete}
//           cursor="pointer"
//         />
//         <Icons
//           name="Write"
//           color="primary"
//           size={1}
//           onClick={handleEdit}
//           cursor="pointer"
//         />
//       </div>

//       <div className={styles.tagCardItem}>
//         <span>نام</span>
//         <div className={styles.tagCardName}>{name}</div>
//       </div>
//       <div className={styles.tagCardItemColor}>
//         <span>رنگ</span>
//         <TagColor
//           title="عنوان"
//           color={tagColorData?.[color]?.bgColor}
//           active={false}
//           style={{ padding: "0.5rem 0.6rem", width: "4.5rem" }}
//         />
//       </div>
//     </div>
//   );
// };

// export default TagCard;
