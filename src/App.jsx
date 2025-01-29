import { useEffect, useState } from 'react';
import styled from "styled-components";

import AllListsView from './components/AllListsView';
import CreationView from './components/CreationView';
import ErrorView from './components/ErrorView';
import LoadingView from './components/LoadingView';

const API_URL = "https://apis.ccbp.in/list-creation/lists";


const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const groupItemsByListNumber = (items) => {
  const grouped = items.reduce((acc, item) => {
    const listNum = item.list_number;
    if (!acc[listNum]) {
      acc[listNum] = {
        id: `list-${listNum}`,
        list_number: listNum,
        title: `List ${listNum}`,
        items: [],
      };
    }
    acc[listNum].items.push(item);
    return acc;
  }, {});
  return Object.values(grouped).sort((a, b) => a.list_number - b.list_number);
};

const App = () => {
  const [apiStatus, setApiStatus] = useState('loading');
  const [lists, setLists] = useState([]);
  const [selectedListIds, setSelectedListIds] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [creationData, setCreationData] = useState({ left: null, middle: null, right: null });

  const fetchLists = async () => {
    setApiStatus('loading');
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Failed to fetch');
      const items = await response.json();
      const groupedLists = groupItemsByListNumber(items.lists);
      setLists(groupedLists);
      setApiStatus('success');
    } catch {
      setErrorMessage('Failed to fetch lists. Please try again.');
      setApiStatus('failure');
    }
  };

  useEffect(() => { fetchLists(); }, []);

  const handleSelectList = (listId) => {
    setSelectedListIds(prev =>
      prev.includes(listId) ? prev.filter(id => id !== listId) : [...prev, listId]
    );
    setErrorMessage('');
  };

  const handleCreateNewList = () => {
    if (selectedListIds.length !== 2) {
      setErrorMessage('You should select exactly 2 lists to create a new list');
      return;
    }
    const [list1, list2] = selectedListIds
      .map(id => lists.find(list => list.id === id))
      .sort((a, b) => a.list_number - b.list_number);
    const nextListNumber = lists.length + 1;
    const middleList = {
      id: `new-${Date.now()}`,
      list_number: nextListNumber,
      title: `List ${nextListNumber}`,
      items: [],
    };
    setCreationData({
      left: { ...list1, items: [...list1.items] },
      middle: middleList,
      right: { ...list2, items: [...list2.items] },
    });
    setIsCreating(true);
  };

  const handleCancel = () => {
    setIsCreating(false);
    setCreationData({ left: null, middle: null, right: null });
    setSelectedListIds([]);
  };

  const handleUpdate = () => {
    const existingItems = new Set([
      ...creationData.left.items.map(item => item.id),
      ...creationData.middle.items.map(item => item.id),
      ...creationData.right.items.map(item => item.id)
    ]);

    const filteredItems = lists.flatMap(list => list.items).filter(item => !existingItems.has(item.id));

    setLists(groupItemsByListNumber([
      ...filteredItems,
      ...creationData.left.items,
      ...creationData.middle.items,
      ...creationData.right.items
    ]));
    handleCancel();
  };

  const moveItem = (from, to, itemId) => {
    const fromList = creationData[from];
    const toList = creationData[to];
    const itemIndex = fromList.items.findIndex(item => item.id === itemId);
    if (itemIndex === -1) return;
    const item = { ...fromList.items[itemIndex], list_number: toList.list_number };
    const newFromItems = [...fromList.items];
    newFromItems.splice(itemIndex, 1);
    const newToItems = [...toList.items, item];
    setCreationData(prev => ({
      ...prev,
      [from]: { ...prev[from], items: newFromItems },
      [to]: { ...prev[to], items: newToItems },
    }));
  };

  const renderContent = () => {
    switch (apiStatus) {
      case 'loading': return <LoadingView />;
      case 'failure': return <ErrorView message={errorMessage} onRetry={fetchLists} />;
      case 'success': return isCreating ? (
        <CreationView
          leftList={creationData.left}
          middleList={creationData.middle}
          rightList={creationData.right}
          onMoveItem={moveItem}
          onCancel={handleCancel}
          onUpdate={handleUpdate}
        />
      ) : (
        <AllListsView
          lists={lists}
          selectedListIds={selectedListIds}
          onSelectList={handleSelectList}
          errorMessage={errorMessage}
          onCreateNewList={handleCreateNewList}
        />
      );
      default: return null;
    }
  };
  return <CenteredContainer>{renderContent()}</CenteredContainer>;
};

export default App;
