ALTER TABLE tasks
ADD COLUMN category_id BIGINT;

ALTER TABLE tasks
ADD CONSTRAINT fk_task_category
FOREIGN KEY (category_id)
REFERENCES categories(id)
ON DELETE SET NULL;