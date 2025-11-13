import React, { useEffect, useState } from "react";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import {
  Box,
  Text,
  Button,
  ButtonText,
  Heading,
  Card,
} from "@gluestack-ui/themed";

// An example demonstrating the usage of native modules.
export function AsyncStorageExample(): JSX.Element {
  const [value, setValue] = useState("     ");
  const { getItem, setItem } = useAsyncStorage("@counter");

  const readItemFromStorage = async () => {
    const item = await getItem();
    setValue(item || "");
  };

  const writeItemToStorage = async (newValue: string) => {
    await setItem(newValue);
    setValue(newValue);
  };

  useEffect(() => {
    readItemFromStorage();
  }, []);

  return (
    <Card
      sx={{
        padding: 24,
        backgroundColor: '$white',
        borderRadius: 12,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
      }}
    >
      <Box>
        {/* Title */}
        <Heading
          sx={{
            fontSize: 18,
            textAlign: 'center',
          }}
        >
          AsyncStorage Demo
        </Heading>

        {/* Description */}
        <Text
          sx={{
            fontSize: 14,
            textAlign: 'center',
            color: '$gray600',
            marginTop: 16,
          }}
        >
          Test the async-storage native module by updating the value below and
          refreshing the app
        </Text>

        {/* Current Value Display */}
        <Box
          sx={{
            backgroundColor: '$gray100',
            borderRadius: 8,
            padding: 16,
            marginTop: 16,
          }}
        >
          <Box
            sx={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text
              sx={{
                fontSize: 16,
                fontWeight: '500',
                marginRight: 8,
              }}
            >
              Current value:
            </Text>
            <Text
              sx={{
                fontSize: 16,
                fontWeight: 'bold',
                color: '$primary600',
              }}
            >
              {value || "(empty)"}
            </Text>
          </Box>
        </Box>

        {/* Update Button */}
        <Button
          onPress={() =>
            writeItemToStorage(Math.random().toString(36).substr(2, 5))
          }
          sx={{
            marginTop: 16,
            backgroundColor: '$primary600',
            borderRadius: 8,
            paddingHorizontal: 16,
            paddingVertical: 12,
          }}
        >
          <ButtonText
            sx={{
              color: '$white',
              fontWeight: '600',
            }}
          >
            Update Value
          </ButtonText>
        </Button>
      </Box>
    </Card>
  );
}
