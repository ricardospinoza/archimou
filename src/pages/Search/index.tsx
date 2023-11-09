// import React from 'react';
import React, {useEffect, useState} from 'react';
import {SectionList} from 'react-native';
import {SearchHeader} from '../../components';
import {useUser} from '../../hooks';
import {PersonNode} from '../../models/TreeViewModel';
import {getParentsByNode, getUsersByName} from '../../service';
import {NodeTile} from './NodeTile';
import {NoSearch} from './NoSearch';
import {Container} from './styles';
import {UserNotFound} from './UserNotFound';

interface SearchProps {
  route: any;
}

export const Search = ({route}: SearchProps) => {
  const user = useUser();

  const node = route.params?.node;

  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState<
    (PersonNode & {parentsNames?: string[]})[]
  >([]);

  useEffect(() => {
    if (searchTerm.length >= 3) {
      fetchUsers();
    }
  }, [searchTerm]);

  const fetchUsers = async () => {
    const usersRaw = await getUsersByName(searchTerm);

    const users = await Promise.all(
      usersRaw!.map(async user => {
        const parentsNames = await getParentsByNode(user);
        return {
          ...user,
          parentsNames,
        };
      }),
    );

    setUsers(users);
  };

  return (
    <Container>
      <SearchHeader onChangeSearchTerm={setSearchTerm} />
      {!searchTerm ? (
        <NoSearch node={node} />
      ) : (

        users.length === 0 
        ?
          <UserNotFound node={node} />
        :
          <SectionList
            sections={[
              {
                title: 'Users',
                data: users.filter(({id}) => user.id !== id),
              },
            ]}
            renderItem={({item}) => {
              return (
                <NodeTile
                  id={item.id}
                  user={user}
                  name={item.name}
                  parents={!!item.parentsNames ? item.parentsNames : []}
                />
              );
            }}
          />

      )}
    </Container>
  );
};
