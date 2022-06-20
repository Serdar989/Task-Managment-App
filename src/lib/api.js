const FIREBASE_DOMAIN = 'https://budget-app-ab032-default-rtdb.firebaseio.com';

export async function getAllClients() {
  const response = await fetch(`${FIREBASE_DOMAIN}/clients.json`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not fetch quotes.');
  }

  const loadedClients = [];

  for (const key in data) {
    loadedClients.push({
      id: key,
      companyLogo: data[key].companyLogo,
      logoUpload: data[key].logoUpload,
      company: data[key].company,
      location: data[key].location,
      clientName: data[key].clientName,
      email: data[key].email,
      contactNumber: data[key].contactNumber,
      services: data[key].services,
    });
  }

  return loadedClients;
}

export async function getSingleClient(clientId) {
  const response = await fetch(`${FIREBASE_DOMAIN}/clients/${clientId}.json`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Could not fetch Client.');
  }

  const loadedClient = {
    ...data,
  };

  return loadedClient;
}

export async function addClient(clientData) {
  console.log('data je ' + JSON.stringify(clientData));
  const response = await fetch(`${FIREBASE_DOMAIN}/clients.json`, {
    method: 'POST',
    body: JSON.stringify(clientData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not create quote.');
  }

  return null;
}
export async function editClientHandler(requestData) {
  const response = await fetch(
    `${FIREBASE_DOMAIN}/clients/${requestData.clientsId}.json`,
    {
      method: 'PATCH',
      body: JSON.stringify(requestData.clientData),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Could not edit task.');
  }

  return null;
}

export async function removeClientHandler(clientsId) {
  const response = await fetch(`${FIREBASE_DOMAIN}/clients/${clientsId}.json`, {
    method: 'DELETE',
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not add task.');
  }

  return null;
}

export async function addTask(requestData) {
  const response = await fetch(
    `${FIREBASE_DOMAIN}/clients/${requestData.clientsId}/tasks.json`,
    {
      method: 'POST',
      body: JSON.stringify(requestData.taskData),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not add comment.');
  }

  return null;
}

export async function getAllTasks(clientId) {
  const response = await fetch(
    `${FIREBASE_DOMAIN}/clients/${clientId}/tasks.json`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not get comments.');
  }

  const transformedTasks = [];

  for (const key in data) {
    const taskObj = {
      id: key,
      ...data[key],
    };

    transformedTasks.push(taskObj);
  }

  return transformedTasks;
}

export async function removeTaskHandler(taskData) {
  const response = await fetch(
    `${FIREBASE_DOMAIN}/clients/${taskData.clientsId}/tasks/${taskData.taskId}.json`,
    {
      method: 'DELETE',
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not add task.');
  }

  return null;
}

export async function getSingleTask(taskData) {
  const response = await fetch(
    `${FIREBASE_DOMAIN}/clients/${taskData.clientsId}/tasks/${taskData.taskId}.json`
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Could not fetch Client.');
  }

  const loadedTask = {
    ...data,
  };

  return loadedTask;
}

export async function editTaskHandler(requestData) {
  const response = await fetch(
    `${FIREBASE_DOMAIN}/clients/${requestData.clientsId}/tasks/${requestData.taskId}.json`,
    {
      method: 'PATCH',
      body: JSON.stringify(requestData.taskData),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not edit task.');
  }

  return null;
}
