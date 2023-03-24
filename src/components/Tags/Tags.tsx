import { FC } from 'react';
import useNotes from '../../context/NotesContext';
import { checkedTags } from '../../helpers/checkedTags';

const Tags: FC = () => {
	const { tags, filterTag } = useNotes();
	const checked = checkedTags(tags);

	return tags.length ? (
		<section className="tags__wrapper">
			<h2>Filter by tags:</h2>
			{checked && <p>{checked}</p>}
			<div className="tags-list">
				{tags.map(tag => (
					<div
						key={tag.id}
						className={`tags-item ${tag.checked ? 'checked' : ''}`}
						onClick={filterTag(tag.id)}
					>
						{tag.tag}
					</div>
				))}
			</div>
		</section>
	) : null;
};

export default Tags;
