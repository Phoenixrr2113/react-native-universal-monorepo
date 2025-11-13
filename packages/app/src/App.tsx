import React from "react";
import { ImageSourcePropType, Platform } from "react-native";
import {
  Box,
  Text,
  Heading,
  Badge,
  BadgeText,
  Image,
  Center,
  GluestackUIProvider,
} from "@gluestack-ui/themed";
import { config } from "../gluestack-ui.config";
import { AsyncStorageExample } from "./AsyncStorageExample";
import { subplatform } from "./config";
import LogoSrc from "./logo.png";

export function App(): JSX.Element {
  const platformValue = subplatform
    ? `${Platform.OS} (${subplatform})`
    : Platform.OS;

  return (
    <GluestackUIProvider config={config}>
      <Box
        sx={{
          flex: 1,
          backgroundColor: '$white',
        }}
      >
        <Center
          sx={{
            flex: 1,
            paddingHorizontal: 16,
          }}
        >
          <Box
            sx={{
              alignItems: 'center',
              maxWidth: 500,
              width: '100%',
            }}
          >
            {/* Logo */}
            <Image
              source={LogoSrc as ImageSourcePropType}
              alt="React Native Logo"
              sx={{
                width: 128,
                height: 128,
                borderRadius: 16,
              }}
            />

            {/* Heading */}
            <Heading
              sx={{
                fontSize: 24,
                textAlign: 'center',
                marginTop: 24,
              }}
            >
              Hello from React Native!
            </Heading>

            {/* Platform Badge */}
            <Box
              sx={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 16,
              }}
            >
              <Text
                sx={{
                  fontSize: 20,
                  fontWeight: '600',
                  marginRight: 8,
                }}
              >
                Platform:
              </Text>
              <Badge
                sx={{
                  backgroundColor: '$primary500',
                  borderRadius: 8,
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                }}
              >
                <BadgeText
                  sx={{
                    color: '$white',
                    fontWeight: '500',
                  }}
                >
                  {platformValue}
                </BadgeText>
              </Badge>
            </Box>

            {/* AsyncStorage Example */}
            <Box
              sx={{
                width: '100%',
                marginTop: 16,
              }}
            >
              <AsyncStorageExample />
            </Box>
          </Box>
        </Center>
      </Box>
    </GluestackUIProvider>
  );
}
