const addTodoModal = getElById('add-todo-modal'),
			modalCloseButton = getElById('close-button'),
			modalAcceptButton = getElById('accept-button'),
			addTodoButton = getElById('add-button');

function hideModal(e) {
	addTodoModal.classList.add('hidden');
	addTodoButton.classList.remove('hidden');
};

function showModal(e) {
	addTodoModal.classList.remove('hidden');
	addTodoButton.classList.add('hidden');
};

function closeTodo(e) {
	const closeButtonClicked = e.target,
				buttonParentID = closeButtonClicked.getAttribute('todo-parent'),
				elsButtonHides = getElsByQuery(`[todo-parent=${buttonParentID}]`);

	closeButtonClicked.classList.add('hidden');
	for (let el of elsButtonHides) {
		el.classList.remove('shown-todo-child');
	}
}

function getElById(id, parent) {
	if (parent) { return parent.getElementById(id) }
	else { return document.getElementById(id) }
};

function getElsByClass(className, parent) {
	if (parent) { return parent.getElementsByClassName(className) }
	else { return document.getElementsByClassName(className) }
};

function getElByQuery(query, parent) {
	if (parent) { return parent.querySelector(query) }
	else { return document.querySelector(query) }
};

function getElsByQuery(query, parent) {
	if (parent) { return parent.querySelectorAll(query) }
	else { return document.querySelectorAll(query) }
};

function getElsByTag(tag, parent) {
	if (parent) { return parent.getElementsByTagName(tag) }
	else { return document.getElementsByTagName(tag) }
};

function addClasses(el, classesArray) {
	classesArray.forEach((_class, i) => {
		el.classList.add(_class);
	});
};

function removeClasses(el, classesArray) {
	classesArray.forEach((_class, i) => {
		el.classList.remove(_class)
	});
};

function getParentTodo(el) {
	const parentID = el.getAttribute('todo-parent'),
				parent = getElById(parentID);

	return parent;
};

function getTodoTree(el) {
	const todoID = el.getAttribute('todo-parent'), // parent's ID

				parent = getElById(todoID),
				children = getElsByQuery('[todo-parent]', parent),
				priority = getElByQuery('.todo-edit-priority', parent).value;
				title = getElByQuery('h3', parent),
				titleText = title.innerText.trim(),
				body = getElByQuery('.todo-body', parent),
				bodyText = body.innerText.trim(),
				originalText = `${titleText} ${bodyText} ${priority}`,
				saveButton = getElByQuery('.todo-save-button', parent),
				discardButton = getElByQuery('.todo-discard-button', parent),
				completeButton = getElByQuery('.todo-complete-button', parent),
				date = getElByQuery('.todo-date', parent),
				closeButton = getElByQuery('.todo-close-button', parent),
				keystrokes = 0;

	return {
		parent,
		children,
		priority,
		title,
		titleText,
		body,
		bodyText,
		originalText,
		saveButton,
		discardButton,
		completeButton,
		date,
		keystrokes,
	}
};

function compareNewAndOriginalText(val, newText) {
	const originalText = val.parent.tree.originalText;
	if (newText != originalText) {

		val.parent.tree.saveButton.classList.remove('inactive-todo-button');
		val.parent.tree.discardButton.classList.remove('inactive-todo-button');
		// console.log(body.todoTree.bodyText, body.innerText);
	} else {

		val.parent.tree.saveButton.classList.add('inactive-todo-button');
		val.parent.tree.discardButton.classList.add('inactive-todo-button');
		// console.log(body.todoTree.bodyText, body.innerText);
	}
}



//| Supply the function with the element being clicked on,
//| the array of values to be applied, and the array of
//| classes to be applied, as well as an optional boolean
//| to determine something that I don't remember now.


function rotatePriorities(el, valueArr, classArr, bordersArr, parent) {
	if (el.value == '0') {
		el.value++; //| Make value = 1;
		removeClasses(el, [classArr[0], classArr[2]]);
		removeClasses(parent, [bordersArr[0], bordersArr[2]]);
		addClasses(el, [classArr[1]]);
		addClasses(parent, [bordersArr[1]]);
		el.innerText = 'PRIORITY: MEDIUM';
	}

	else if (el.value == '1') {
		el.value++; //| Make value = 2;
		removeClasses(el, [classArr[0], classArr[1]]);
		removeClasses(parent, [bordersArr[0], bordersArr[1]]);
		addClasses(el, [classArr[2]]);
		addClasses(parent, [bordersArr[2]]);
		el.innerText = 'PRIORITY: HIGH';
	}

	else if (el.value == '2') {
		el.value = 0; //| Make value = 0;
		removeClasses(el, [classArr[1], classArr[2]]);
		removeClasses(parent, [bordersArr[1], bordersArr[2]]);
		addClasses(el, [classArr[0]]);
		addClasses(parent, [bordersArr[0]]);
		el.innerText = 'PRIORITY: LOW';
	}
}