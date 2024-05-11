import {Icon} from '../Icon';
import {Center, Container, TreeIcon} from './styles';
import { useState } from 'react';
import { Text, View } from 'react-native';

interface DockProps {
  onTreePress: () => void;
}

export const Dock = ({onTreePress}: DockProps) => {
  const [cartCount, setCartCount] = useState<number>(1);
  return (
    <Container>
      <Icon name="search" color="#ffffff" size={30} />
      <Center onPress={onTreePress}>
        <TreeIcon name="treeLogo" color="#ffffff" size={40} />
      </Center>
      
      <View>
        <Icon name="notification" color="#ffffff" size={35} />
        {cartCount > 0 ? (
                  <View
                    style={{     
                      position: 'absolute',
                      backgroundColor: 'red',
                      width: 25,
                      height: 25,
                      borderRadius: 30 / 2,
                      right: -5,
                      top: -6,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: "#FFFFFF",
                        fontSize: 12,
                      }}>
                      {cartCount}
                    </Text>
                  </View>
                ) : null}
      </View>
        
    </Container>
  );
};
