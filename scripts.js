(function($){

	var addEmpBtn = document.getElementById('add-emp'),
		select = document.getElementById('dep-select'),
		addDepBtn = document.getElementById('add-dep'),
		depsView = document.getElementById('deps'),
		empsView = document.getElementById('emps'),
		removeEmpsBtn = document.getElementById('remove-emps'),
		removeDepsBtn = document.getElementById('remove-deps'),
		empNameInput = document.getElementById('emp-name'),
		depNameInput = document.getElementById('dep-name');


	var emps = [],
		depsNames = {},
		deps = [];

	var empId = 1,
		depId = 1;

	init();

	function Employee(id, name, departmentId, hired, depName) {
		this.id = id;
		this.name = name;
		this.departmentId = departmentId;
		this.hired = hired;
		this.depName = depName;
	}

	function Department(id, name) {
		this.id = id;
		this.name = name;
	}

	function init() {

		fetch();

		addDepBtn.addEventListener('click', addDep);
		addEmpBtn.addEventListener('click', addEmp);
		removeEmpsBtn.addEventListener('click', removeCheckedEmps);
		removeDepsBtn.addEventListener('click', removeCheckedDeps);		
	}

	function fetch() {
		$.get( "api/getDepartments.php", function( data ) {
		  	deps = JSON.parse(data);
		  	depsNames = {};
		  	emps = [];

			$.get("api/getEmps.php", function(data){
				emps = JSON.parse(data);

				for(var i = 0; i < deps.length; i++) {
					depsNames[deps[i].id] = deps[i].name;
				}

				for(i = 0; i < emps.length; i++) {
					emps[i].depName = depsNames[emps[i].departmentId];
					emps[i].hired = new Date(emps[i].hired * 1000);
				}

			  	mapDeps();
			  	mapEmps();							
			});

		});		
	}

	function mapDeps() {
		select.innerHTML = "";
		depsView.innerHTML = "";
		depsNames = {};

		for(var i = 0; i < deps.length; i++) {
			depsNames[deps[i].id] = deps[i].name;

			//mapping to select
			var opt = document.createElement('option');
			var text = document.createTextNode(deps[i].name);
			opt.appendChild(text);
			opt.value = deps[i].id;
			select.appendChild(opt);

			//mapping to list
			var div = document.createElement('div');
			div.className = "checkbox";

			var label = document.createElement('label');
			var cb = document.createElement('input');
			cb.type = 'checkbox';
			cb.value = deps[i].id;
			deps[i].cb = cb;

			label.appendChild(cb);
			label.appendChild(document.createTextNode(deps[i].name));

			div.appendChild(label);
			depsView.appendChild(div);


		}
	}

	function mapEmps() {
		empsView.innerHTML = "";
		var table = document.createElement('table');

		table.className = "table table-striped";
		var tbody = document.createElement('tbody');

		for(var i = 0; i < emps.length; i++) {

			//mapping to table
			
			var tr = document.createElement('tr');

			var cbtd = document.createElement('td');
			var cb = document.createElement('input');
			cb.type = 'checkbox';
			cb.value = emps[i].name;
			emps[i].cb = cb;
			cbtd.appendChild(cb);

			var nametd = document.createElement('td');
			nametd.appendChild(document.createTextNode(emps[i].name));

			var deptd = document.createElement('td');
			deptd.appendChild(document.createTextNode(emps[i].depName));

			var timetd = document.createElement('td');
			timetd.appendChild(document.createTextNode(emps[i].hired.toLocaleTimeString()));

			tr.appendChild(cbtd);
			tr.appendChild(nametd);
			tr.appendChild(deptd);
			tr.appendChild(timetd);
			tbody.appendChild(tr);
			

		}
		table.appendChild(tbody);
		empsView.appendChild(table);		
	}

	function addDep() {
		var name = depNameInput.value;

		if(!name) {
			alert('Please specify the name');
			return;
		}

		for(var i = 0; i < deps.length; i++) {
			if(deps[i].name === name) {
				alert("Department with name '" + name + "' already exists");
				return;
			}
		}

		$('#loading').show();

		$.post('api/addDep.php', { name: name })
		.done(function(data){

			var id = +data;

			deps.push(new Department(id, name));
			depNameInput.value = "";
			mapDeps();

			$('#loading').hide();
		});
	}

	function addEmp() {
		console.log(select.value);

		var name = empNameInput.value;
		var depId = select.value;

		if(!name) {
			alert('Please specify the name');
			return;
		}

		if(!depId) {
			alert('Please specify the department');
			return;
		}

		$('#loading').show();

		$.post('api/addEmp.php', { name: name, departmentId: depId })
		.done(function(data){
			console.log(data);

			var id = +data;
			console.log(typeof id);

			emps.push(new Employee(id, name, depId, new Date(), depsNames[depId]));
			empNameInput.value = "";
			mapEmps();

			$('#loading').hide();
		});


	}

	function removeCheckedEmps() {
		var result = [];
		var del = [];
		for(var i = 0; i < emps.length; i++) {
			if(!emps[i].cb.checked) {
				result.push(emps[i]);
			} else {
				del.push(emps[i].id);
			}
		}

		$.post('api/delEmps.php', { IDs: del })
		.done(function(data){
			console.log(data);

			emps = result;

			mapEmps();

			$('#loading').hide();
		});		


	}

	function removeCheckedDeps() {
		$('#loading').show();
		var IDs = [];

		for(var i = 0; i < deps.length; i++ ) {
			if(deps[i].cb.checked) {
				IDs.push(deps[i].id);
			}
		}

		$.post('api/delDeps.php', {IDs: IDs})
		.done(function(data) {
			console.log(data);
			for(var i = 0; i < IDs.length; i++) {
				emps = emps.filter(function(emp) {
					return emp.departmentId != IDs[i];
				});

				deps = deps.filter(function(dep) {
					return IDs.indexOf(dep.id) === -1;
				})
			}
			mapDeps();
			mapEmps();
			$('#loading').hide();
		})
	}


})($);